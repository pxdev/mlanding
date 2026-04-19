import { z } from 'zod'
import type { H3Event } from 'h3'

// ── Auth schemas ──

export const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(80),
  lastName: z.string().min(1, 'Last name is required').max(80),
  email: z.string().email('Invalid email address').max(160),
  password: z.string().min(8, 'Password must be at least 8 characters').max(200),
  // Optional at signup — can be added later in profile settings.
  githubUsername: z.string().regex(/^[a-zA-Z0-9-]{1,39}$/, 'Invalid GitHub username').optional().nullable()
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address')
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(200)
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters').max(200)
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>

// ── Helpers ──

export async function validateBody<T>(event: H3Event, schema: z.ZodSchema<T>): Promise<T> {
  const body = await readBody(event)
  const result = schema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Validation Error',
      data: result.error.flatten().fieldErrors
    })
  }
  return result.data
}
