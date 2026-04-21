// Update an existing plan (admin). Changing priceUsdCents or
// defaultActivations only affects future licenses; already-issued
// licenses keep their snapshot.

import { z } from 'zod'
import prisma from '../../../../utils/prisma'
import { requireAdmin } from '../../../../utils/auth-guards'
import { auditLog } from '../../../../utils/audit'

const bodySchema = z.object({
  name: z.string().min(1).max(120).optional(),
  description: z.string().max(1000).nullable().optional(),
  priceUsdCents: z.number().int().min(0).max(10_000_00).optional(),
  defaultActivations: z.number().int().positive().max(100).optional(),
  lsVariantId: z.string().max(100).nullable().optional(),
  isActive: z.boolean().optional()
})

export default defineEventHandler(async (event) => {
  const { user } = await requireAdmin(event)
  const id = getRouterParam(event, 'id')!
  const body = await readBody(event)
  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid body', data: parsed.error.flatten().fieldErrors })
  }

  const before = await prisma.plan.findUnique({ where: { id } })
  if (!before) throw createError({ statusCode: 404, statusMessage: 'Plan not found' })

  const after = await prisma.plan.update({ where: { id }, data: parsed.data })

  await auditLog({
    actorId: user.id,
    action: 'plan.updated',
    targetType: 'Plan',
    targetId: id,
    metadata: { changes: parsed.data, previous: { priceUsdCents: before.priceUsdCents, isActive: before.isActive } }
  })

  return { id: after.id, name: after.name, priceUsdCents: after.priceUsdCents, defaultActivations: after.defaultActivations, isActive: after.isActive }
})
