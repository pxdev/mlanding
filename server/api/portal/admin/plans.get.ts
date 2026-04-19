// List plans (admin) — feeds the "issue license" form.

import prisma from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/auth-guards'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return prisma.plan.findMany({
    orderBy: { priceUsdCents: 'asc' },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      priceUsdCents: true,
      defaultActivations: true,
      isActive: true
    }
  })
})
