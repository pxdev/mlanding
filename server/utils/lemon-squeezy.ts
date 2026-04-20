// Lemon Squeezy integration — slimmed for the portal's needs:
//   - verifySignature(rawBody, headerSig)        — HMAC-SHA256, timing-safe
//   - createCheckout({ variantId, accountId, email, redirectUrl })
//
// Reference: https://docs.lemonsqueezy.com/api/checkouts

import { createHmac, timingSafeEqual } from 'node:crypto'

const LS_API = 'https://api.lemonsqueezy.com/v1'

export function verifySignature(rawBody: string, headerSig: string | undefined | null): boolean {
  if (!headerSig) return false
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || ''
  if (!secret) {
    console.error('[lemon-squeezy] LEMON_SQUEEZY_WEBHOOK_SECRET not set — refusing all webhooks')
    return false
  }
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex')
  const a = Buffer.from(expected, 'hex')
  let b: Buffer
  try { b = Buffer.from(headerSig, 'hex') } catch { return false }
  return a.length === b.length && timingSafeEqual(a, b)
}

export interface CreateCheckoutOpts {
  variantId: string
  accountId: string
  email: string
  redirectUrl?: string
}

// Cached store subdomain so we only hit /v1/stores/:id once per process.
let _storeDomainCache: string | null = null

async function getStoreDomain(apiKey: string, storeId: string): Promise<string> {
  if (_storeDomainCache) return _storeDomainCache
  const res = await $fetch<any>(`${LS_API}/stores/${storeId}`, {
    headers: {
      Accept: 'application/vnd.api+json',
      Authorization: `Bearer ${apiKey}`
    }
  })
  const domain = res?.data?.attributes?.domain
  if (!domain) throw createError({ statusCode: 502, statusMessage: 'Lemon Squeezy: could not resolve store domain' })
  _storeDomainCache = String(domain)
  return _storeDomainCache
}

// Build the checkout URL.
//
// We use LS's *direct-buy* URLs (`/buy/<variantId>`) rather than the API's
// POST /v1/checkouts, because API-created custom checkouts require full
// merchant activation to render — even in test mode. Direct-buy URLs work
// from day one for unactivated stores in test mode, and are identical in
// behaviour post-activation in live mode.
//
// account_id, email, and redirect_url go through as query params that LS
// populates the checkout form with. The resulting order webhook still
// carries `custom_data.account_id`, so the downstream handler is unchanged.
export async function createCheckout(opts: CreateCheckoutOpts): Promise<string> {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY
  const storeId = process.env.LEMON_SQUEEZY_STORE_ID
  if (!apiKey || !storeId) {
    throw createError({ statusCode: 500, statusMessage: 'Lemon Squeezy not configured' })
  }

  const domain = await getStoreDomain(apiKey, storeId)

  const params = new URLSearchParams()
  params.set('checkout[email]', opts.email)
  params.set('checkout[custom][account_id]', opts.accountId)
  if (opts.redirectUrl) {
    params.set('checkout[success_url]', opts.redirectUrl)
  }

  return `https://${domain}/buy/${opts.variantId}?${params.toString()}`
}
