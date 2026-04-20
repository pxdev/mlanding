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
  // Optional override in cents. If the variant is configured as
  // "pay-what-you-want" or "custom-price", LS requires this; otherwise it
  // just overrides the variant's built-in price.
  amountCents?: number
}

// Returns the LS-hosted checkout URL. The custom data is round-tripped through
// the order webhook so we can map the resulting Order back to the portal Account.
export async function createCheckout(opts: CreateCheckoutOpts): Promise<string> {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY
  const storeId = process.env.LEMON_SQUEEZY_STORE_ID
  if (!apiKey || !storeId) {
    throw createError({ statusCode: 500, statusMessage: 'Lemon Squeezy not configured' })
  }

  // Checkout mode (test vs live) is determined by the API key itself — the
  // main app's working adapter confirms this. There is no test_mode attribute
  // on the checkout resource; passing one causes LS to silently return a URL
  // that refuses to render ("store not activated"). Use a test-mode key in
  // dev and a live-mode key in prod.

  const attributes: Record<string, unknown> = {
    checkout_data: {
      email: opts.email,
      custom: { account_id: opts.accountId }
    },
    checkout_options: {
      button_color: '#7047EB'
    },
    product_options: {
      redirect_url: opts.redirectUrl,
      receipt_button_text: 'Return to dashboard'
    }
  }
  // Matching the main app's adapter: send custom_price when we have one.
  // Handles "pay-what-you-want" variants (which require it) and is harmless
  // for fixed-price variants (just overrides the variant's price with the
  // same value we'd expect).
  if (opts.amountCents !== undefined) {
    attributes.custom_price = opts.amountCents
  }

  const body = {
    data: {
      type: 'checkouts',
      attributes,
      relationships: {
        store: { data: { type: 'stores', id: String(storeId) } },
        variant: { data: { type: 'variants', id: String(opts.variantId) } }
      }
    }
  }

  let res: any
  try {
    res = await $fetch<any>(`${LS_API}/checkouts`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${apiKey}`
      },
      body
    })
  } catch (err: any) {
    // Surface LS's own error detail so operators can debug (vs a generic 502).
    const detail = err?.data?.errors?.[0]?.detail || err?.message || 'Unknown error'
    throw createError({ statusCode: 502, statusMessage: `Lemon Squeezy: ${detail}` })
  }

  const url = res?.data?.attributes?.url
  if (!url) throw createError({ statusCode: 502, statusMessage: 'Lemon Squeezy returned no checkout URL' })
  return url as string
}
