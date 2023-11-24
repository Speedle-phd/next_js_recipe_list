import { z } from "zod";

export const loginSchema = z.object({
   email: z.string().email(),
   password: z.string()
})

export type TLoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z
   .object({
      email: z.string().email(),
      password: z.string().min(7, 'Password must be at least 7 characters'),
      confirmPassword: z.string(),
   })
   .refine((data) => data.confirmPassword === data.password, {
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
   })

export type TRegisterSchema = z.infer<typeof registerSchema>

export type TAuthResponse = {
   success: boolean,
   errors?: string[],
   statuscode?: number,
   message?: string
}