// Structured integration status for the Settings admin page.
//
// This is a diagnostic endpoint: the operator sees what's configured
// without having to SSH into the server. We never echo raw secrets —
// only booleans and masked identifiers. Values that ARE safe to expose
// (store IDs, org names, repo paths, SMTP host) are returned in full.

import { requireAdmin } from '../../../../utils/auth-guards'

function mask(value: string | undefined, keepStart = 4, keepEnd = 4): string | null {
  if (!value) return null
  if (value.length <= keepStart + keepEnd + 1) return value.slice(0, keepStart) + '…'
  return value.slice(0, keepStart) + '…' + value.slice(-keepEnd)
}

async function verifyLicenseKeypair(): Promise<boolean> {
  try {
    const { signCertificate, publicKeyFromEnv } = await import('../../../../utils/license-signing')
    const { verify: cryptoVerify } = await import('node:crypto')
    const test = signCertificate({
      v: 1,
      licenseId: 'keypair-check',
      keyPrefix: 'MFY-TEST',
      customer: 'noreply@localhost',
      fingerprint: 'keypair-check',
      activatedAt: new Date().toISOString(),
      expiresAt: null,
      maxActivations: 1,
      issuer: 'self-check'
    })
    // Reconstruct the canonical bytes the signer produced.
    const { sig: _sig, ...payload } = test
    const keys = Object.keys(payload).sort()
    const canonical = '{' + keys.map(k => JSON.stringify(k) + ':' + JSON.stringify((payload as any)[k])).join(',') + '}'
    return cryptoVerify(null, Buffer.from(canonical, 'utf8'), publicKeyFromEnv(), Buffer.from(test.sig, 'base64'))
  } catch {
    return false
  }
}

async function verifyGithubToken(): Promise<boolean | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null
  try {
    const res = await $fetch<{ login: string }>('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      timeout: 5000,
      retry: 0
    })
    return Boolean(res?.login)
  } catch {
    return false
  }
}

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const publicKeyHex = process.env.LICENSE_SIGNING_PUBLIC_KEY || null
  const hasPrivate = !!process.env.LICENSE_SIGNING_PRIVATE_KEY
  const licenseKeypairMatches = hasPrivate && publicKeyHex ? await verifyLicenseKeypair() : false

  return {
    licenseSigning: {
      privateKeySet: hasPrivate,
      publicKeyMasked: mask(publicKeyHex ?? undefined, 8, 8),
      keypairMatches: licenseKeypairMatches
    },
    lemonSqueezy: {
      apiKeySet: !!process.env.LEMON_SQUEEZY_API_KEY,
      storeId: process.env.LEMON_SQUEEZY_STORE_ID || null,
      storeDomain: process.env.LEMON_SQUEEZY_STORE_DOMAIN || null,
      webhookSecretSet: !!process.env.LEMON_SQUEEZY_WEBHOOK_SECRET,
      testMode: process.env.LEMON_SQUEEZY_TEST_MODE === 'true'
    },
    github: {
      tokenSet: !!process.env.GITHUB_TOKEN,
      org: process.env.GITHUB_ORG || null,
      teamSlug: process.env.GITHUB_TEAM_SLUG || null,
      repo: process.env.GITHUB_REPO || null,
      tokenValid: await verifyGithubToken()
    },
    smtp: {
      configured: !!(process.env.SMTP_HOST && process.env.SMTP_FROM),
      host: process.env.SMTP_HOST || null,
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : null,
      from: process.env.SMTP_FROM || null,
      userSet: !!process.env.SMTP_USER
    },
    licensePepperSet: !!process.env.LICENSE_PEPPER,
    portalUrl: process.env.NUXT_PUBLIC_PORTAL_URL || null,
    nodeEnv: process.env.NODE_ENV || 'development',
    sessionCookieSecure: process.env.NUXT_SESSION_COOKIE_SECURE === 'true'
  }
})
