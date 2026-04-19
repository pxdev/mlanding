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

// Returns the LS-hosted checkout URL. The custom data is round-tripped through
// the order webhook so we can map the resulting Order back to the portal Account.
export async function createCheckout(opts: CreateCheckoutOpts): Promise<string> {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY
  const storeId = process.env.LEMON_SQUEEZY_STORE_ID
  if (!apiKey || !storeId) {
    throw createError({ statusCode: 500, statusMessage: 'Lemon Squeezy not configured' })
  }

  const body = {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_data: {
          email: opts.email,
          custom: { account_id: opts.accountId }
        },
        product_options: opts.redirectUrl ? { redirect_url: opts.redirectUrl } : undefined
      },
      relationships: {
        store: { data: { type: 'stores', id: String(storeId) } },
        variant: { data: { type: 'variants', id: String(opts.variantId) } }
      }
    }
  }

  const res = await $fetch<any>(`${LS_API}/checkouts`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${apiKey}`
    },
    body
  })

  const url = res?.data?.attributes?.url
  if (!url) throw createError({ statusCode: 502, statusMessage: 'Lemon Squeezy returned no checkout URL' })
  return url as string
}
