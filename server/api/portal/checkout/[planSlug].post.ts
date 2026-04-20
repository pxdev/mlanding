// Authenticated checkout — builds a Lemon Squeezy hosted-checkout URL with
// custom_data.account_id set so the resulting order webhook can be tied
// back to the portal account.
//
// Usage from the marketing pricing page:
//   const { url } = await $fetch('/api/portal/checkout/self-install', { method: 'POST' })
//   window.location.href = url
//
// If the visitor isn't logged in, the marketing-page CTA bounces them
// through /auth/register?next=/portal/pricing first.

import prisma from '../../../utils/prisma'
import { requireSession } from '../../../utils/auth-guards'
import { createCheckout } from '../../../utils/lemon-squeezy'

export default defineEventHandler(async (event) => {
  const { user } = await requireSession(event)
  enforceRateLimit(event, { max: 10, windowSeconds: 60 })

  const slug = getRouterParam(event, 'planSlug')!
  const plan = await prisma.plan.findUnique({ where: { slug } })
  if (!plan || !plan.isActive) {
    throw createError({ statusCode: 404, statusMessage: 'Plan not found' })
  }
  if (!plan.lsVariantId) {
    throw createError({ statusCode: 503, statusMessage: 'This plan is not yet wired to a Lemon Squeezy variant' })
  }

  const portalUrl = process.env.NUXT_PUBLIC_PORTAL_URL || getRequestURL(event).origin
  const url = await createCheckout({
    variantId: plan.lsVariantId,
    accountId: user.id,
    email: user.email,
    redirectUrl: `${portalUrl}/dashboard?purchased=${plan.slug}`,
    amountCents: plan.priceUsdCents
  })

  return { url }
})
