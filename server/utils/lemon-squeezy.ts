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

interface LsCheckoutResponse {
  data: { id: string, attributes: { url: string } }
}

// Build the checkout URL via the API's POST /v1/checkouts.
//
// This produces a `/checkout/custom/<UUID>` URL that works in test mode
// against an unactivated store. Direct-buy URLs (`/buy/<variantId>`) hit
// the public storefront and return "This store has not been activated"
// until the merchant completes activation.
export async function createCheckout(opts: CreateCheckoutOpts): Promise<string> {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY
  const storeId = process.env.LEMON_SQUEEZY_STORE_ID
  if (!apiKey || !storeId) {
    throw createError({ statusCode: 500, statusMessage: 'Lemon Squeezy not configured' })
  }

  const payload = {
    data: {
      type: 'checkouts' as const,
      attributes: {
        checkout_data: {
          email: opts.email,
          custom: { account_id: opts.accountId }
        },
        product_options: {
          redirect_url: opts.redirectUrl,
          receipt_button_text: 'Return to Dashboard'
        }
      },
      relationships: {
        store: { data: { type: 'stores' as const, id: storeId } },
        variant: { data: { type: 'variants' as const, id: opts.variantId } }
      }
    }
  }

  let response: LsCheckoutResponse
  try {
    response = await $fetch<LsCheckoutResponse>(`${LS_API}/checkouts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      body: payload
    })
  } catch (err: any) {
    const msg = err?.data?.errors?.[0]?.detail || err?.message || 'Failed to create checkout'
    throw createError({ statusCode: 502, statusMessage: `Lemon Squeezy: ${msg}` })
  }

  const url = response?.data?.attributes?.url
  if (!url) {
    throw createError({ statusCode: 502, statusMessage: 'Lemon Squeezy: No checkout URL returned' })
  }
  return url
}
