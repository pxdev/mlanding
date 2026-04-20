// Public license activation endpoint — called by self-hosted Momentfy
// instances during the install wizard.
//
// Flow:
//   1. Look up the License by hashed key (no plaintext on server logs).
//   2. If license is REVOKED / EXPIRED / inactive — refuse.
//   3. If this fingerprint already has an Activation row, return the
//      existing token (idempotent: re-running the installer is harmless).
//   4. Otherwise create a new Activation if count < maxActivations,
//      else 403 'max_activations_reached'.
//
// Rate-limited tightly (5/min/IP) — activations are rare and abuse-prone.

import prisma from '../../../utils/prisma'
import { randomBytes } from 'node:crypto'
import { activateLicenseSchema, validateBody } from '../../../utils/validation'
import { hashLicenseKey, isLicenseKeyShape } from '../../../utils/license'
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
      activations: { where: { deactivatedAt: null } }
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

  // Idempotency: same fingerprint already activated → return existing token.
  const existing = await prisma.activation.findUnique({
    where: { licenseId_fingerprint: { licenseId: license.id, fingerprint: body.fingerprint } }
  })
  if (existing && !existing.deactivatedAt) {
    await prisma.activation.update({
      where: { id: existing.id },
      data: {
        lastSeenAt: new Date(),
        ipAddress: ip,
        appVersion: body.version ?? existing.appVersion,
        hostname: body.hostname ?? existing.hostname
      }
    })
    return {
      activationToken: existing.activationToken,
      license: licenseSnapshot(license)
    }
  }

  // Capacity check + create inside a Serializable transaction so two
  // concurrent activates on the same license can't both slip past the cap.
  // Rare under light load, but worth closing — licenses being sold as
  // "1 install per key" means the cap is contractually meaningful.
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
    // Rethrow H3 errors as-is; wrap everything else so we don't leak internals.
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

  return { activationToken: token, license: licenseSnapshot(license) }
})

function licenseSnapshot(l: any) {
  return {
    plan: l.plan,
    status: l.status,
    maxActivations: l.maxActivations,
    expiresAt: l.expiresAt
  }
}
