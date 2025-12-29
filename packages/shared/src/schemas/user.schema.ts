import { z } from 'zod'

export const loginSchema = z.object({
  phone: z.string().regex(/^1[3-9]\d{9}$/, '手机号格式错误'),
  code: z.string().length(6, '验证码为6位'),
})

export const updateProfileSchema = z.object({
  nickname: z.string().min(1).max(20).optional(),
  avatar: z.string().url().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
