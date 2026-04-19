import prisma from '../../utils/prisma'
import { registerSchema } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  enforceRateLimit(event, { max: 5, windowSeconds: 60 })
  const data = await validateBody(event, registerSchema)

  const passwordHash = await hashPassword(data.password)

  let account
  try {
    account = await prisma.account.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email.toLowerCase(),
        githubUsername: data.githubUsername || null,
        passwordHash
      }
    })
  } catch (e: any) {
    if (e.code === 'P2002') {
      throw createError({ statusCode: 409, statusMessage: 'An account with this email already exists' })
    }
    throw e
  }

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
