import prisma from '../../utils/prisma'
import { loginSchema } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  // Per-IP brute force defence
  enforceRateLimit(event, { max: 10, windowSeconds: 60 })
  const { email, password } = await validateBody(event, loginSchema)

  // Per-email defence (catches distributed credential stuffing)
  enforceRateLimitKey(`login:${email.toLowerCase()}`, { max: 5, windowSeconds: 60 })

  const account = await prisma.account.findUnique({ where: { email } })
  if (!account || !await verifyPassword(account.passwordHash, password)) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }
  if (!account.isActive) {
    throw createError({ statusCode: 403, statusMessage: 'Account is deactivated' })
  }

  await prisma.account.update({
    where: { id: account.id },
    data: { lastLoginAt: new Date() }
  })

  await setUserSession(event, {
    user: {
      id: account.id,
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
      isAdmin: account.isAdmin
    },
    loggedInAt: Date.now()
  })

  return {
    user: {
      id: account.id,
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
      isAdmin: account.isAdmin
    }
  }
})
