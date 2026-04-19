import prisma from '../../utils/prisma'
import { forgotPasswordSchema } from '../../utils/validation'
import { generateToken } from '../../utils/tokens'
import { sendEmail, emailLayout } from '../../utils/email'

export default defineEventHandler(async (event) => {
  enforceRateLimit(event, { max: 3, windowSeconds: 60 })
  const { email } = await validateBody(event, forgotPasswordSchema)

  const account = await prisma.account.findUnique({ where: { email: email.toLowerCase() } })

  // Always return success to prevent enumeration
  if (!account || !account.isActive) {
    return { success: true }
  }

  // Invalidate existing unused tokens
  await prisma.passwordReset.updateMany({
    where: { accountId: account.id, usedAt: null },
    data: { usedAt: new Date() }
  })

  const { token, hash } = generateToken(32)
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1h

  await prisma.passwordReset.create({
    data: {
      accountId: account.id,
      token: hash,
      expiresAt
    }
  })

  const reqUrl = getRequestURL(event)
  const resetUrl = `${reqUrl.origin}/auth/reset-password?token=${token}`

  await sendEmail({
    to: account.email,
    subject: 'Reset your Momentfy password',
    html: emailLayout('Password reset', `
      <p>Hi${account.firstName ? ` ${account.firstName}` : ''},</p>
      <p>Click the link below to set a new password. The link expires in 1 hour.</p>
      <p style="margin:24px 0">
        <a href="${resetUrl}" style="display:inline-block;padding:10px 18px;background:#111;color:#fff;border-radius:8px;text-decoration:none">Reset password</a>
      </p>
      <p style="font-size:13px;color:#666">If you didn't request this, you can safely ignore this email.</p>
    `)
  })

  return { success: true }
})
