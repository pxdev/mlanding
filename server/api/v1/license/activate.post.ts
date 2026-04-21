// Public license activation endpoint — called by self-hosted Momentfy
// instances during the install wizard.
//
// Flow:
//   1. Look up the License by hashed key (no plaintext on server logs).
//   2. If license is REVOKED / EXPIRED / inactive — refuse.
//   3. If this fingerprint already has an Activation row, reissue the
//      certificate (idempotent: re-running the installer is harmless).
//   4. Otherwise create a new Activation if count < maxActivations,
//      else 403 'max_activations_reached'.
//   5. Return an Ed25519-signed certificate bound to the fingerprint.
//
// The activationToken stays in the DB as the stable activation identity
// (for deactivate + heartbeat), but the customer-facing artefact is now
// the certificate JSON — that is what the main app persists and verifies.
//
// Rate-limited tightly (5/min/IP) — activations are rare and abuse-prone.

import prisma from '../../../utils/prisma'
import { randomBytes } from 'node:crypto'
import { activateLicenseSchema, validateBody } from '../../../utils/validation'
import { hashLicenseKey, isLicenseKeyShape } from '../../../utils/license'
import { signCertificate, type CertificatePayload } from '../../../utils/license-signing'
import { auditLog } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  enforceRateLimit(event, { max: 5, windowSeconds: 60 })
  const body = await validateBody(event, activateLicenseSchema)

  if (!isLicenseKeyShape(body.key)) {
    // Don't disclose whether the format is wrong vs the key is unknown.
    throw createError({ statusCode: 404, statusMessage: 'License not found' })
  }

  const keyHash = hashLicenseKey(body.key)
  const license = await prisma.license.findUnique({
    where: { keyHash },
    include: {
      plan: { select: { slug: true, name: true } },
      account: { select: { email: true } }
    }
  })

  if (!license) {
    throw createError({ statusCode: 404, statusMessage: 'License not found' })
  }
  if (license.status === 'REVOKED') {
    throw createError({ statusCode: 403, statusMessage: 'License revoked', data: { reason: 'revoked' } })
  }
  if (license.status === 'EXPIRED' || (license.expiresAt && license.expiresAt < new Date())) {
    throw createError({ statusCode: 403, statusMessage: 'License expired', data: { reason: 'expired' } })
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) || null
  const issuer = process.env.NUXT_PUBLIC_PORTAL_URL || 'portal.momentfy.com'

  // Idempotency: same fingerprint already activated → reissue a fresh cert
  // with a current activatedAt. Lets customers re-run installer safely.
  const existing = await prisma.activation.findUnique({
    where: { licenseId_fingerprint: { licenseId: license.id, fingerprint: body.fingerprint } }
  })
  if (existing && !existing.deactivatedAt) {
    const now = new Date()
    await prisma.activation.update({
      where: { id: existing.id },
      data: {
        lastSeenAt: now,
        ipAddress: ip,
        appVersion: body.version ?? existing.appVersion,
        hostname: body.hostname ?? existing.hostname
      }
    })
    return issueCertificate({
      licenseId: license.id,
      keyPrefix: license.keyPrefix,
      customer: license.account.email,
      fingerprint: body.fingerprint,
      activatedAt: now,
      expiresAt: license.expiresAt,
      maxActivations: license.maxActivations,
      issuer,
      activationToken: existing.activationToken
    })
  }

  // Capacity check + create inside a Serializable transaction so two
  // concurrent activates on the same license can't both slip past the cap.
  const token = randomBytes(32).toString('base64url')
  let activation
  try {
    activation = await prisma.$transaction(async (tx) => {
      const live = await tx.activation.count({
        where: { licenseId: license.id, deactivatedAt: null }
      })
      if (live >= license.maxActivations) {
        throw createError({
          statusCode: 403,
          statusMessage: 'Max activations reached',
          data: { reason: 'max_activations_reached', current: live, max: license.maxActivations }
        })
      }
      return await tx.activation.create({
        data: {
          licenseId: license.id,
          fingerprint: body.fingerprint,
          hostname: body.hostname ?? null,
          ipAddress: ip,
          appVersion: body.version ?? null,
          activationToken: token
        }
      })
    }, { isolationLevel: 'Serializable' })
  } catch (err: any) {
    if (err && typeof err === 'object' && 'statusCode' in err) throw err
    throw createError({ statusCode: 500, statusMessage: 'Activation failed' })
  }

  await auditLog({
    actorId: null,
    action: 'license.activated',
    targetType: 'Activation',
    targetId: activation.id,
    metadata: {
      licenseId: license.id,
      keyPrefix: license.keyPrefix,
      fingerprint: body.fingerprint,
      hostname: body.hostname,
      version: body.version
    }
  })

  return issueCertificate({
    licenseId: license.id,
    keyPrefix: license.keyPrefix,
    customer: license.account.email,
    fingerprint: body.fingerprint,
    activatedAt: activation.createdAt,
    expiresAt: license.expiresAt,
    maxActivations: license.maxActivations,
    issuer,
    activationToken: token
  })
})

function issueCertificate(args: {
  licenseId: string
  keyPrefix: string
  customer: string
  fingerprint: string
  activatedAt: Date
  expiresAt: Date | null
  maxActivations: number
  issuer: string
  activationToken: string
}) {
  const payload: CertificatePayload = {
    v: 1,
    licenseId: args.licenseId,
    keyPrefix: args.keyPrefix,
    customer: args.customer,
    fingerprint: args.fingerprint,
    activatedAt: args.activatedAt.toISOString(),
    expiresAt: args.expiresAt ? args.expiresAt.toISOString() : null,
    maxActivations: args.maxActivations,
    issuer: args.issuer
  }
  const cert = signCertificate(payload)
  // The activationToken is NOT embedded in the cert — it's an optional
  // companion returned for clients that want to call heartbeat/deactivate
  // later. The cert alone is what gates the main app.
  return {
    certificate: cert,
    activationToken: args.activationToken
  }
}
