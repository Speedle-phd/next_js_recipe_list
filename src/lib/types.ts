import { z } from 'zod'

export const loginSchema = z.object({
   email: z
      .string()
      .min(1, { message: 'Please fill out your email address' })
      .email({ message: 'Invalid email address' })
      ,
   password: z.string().min(1, { message: 'Please enter your password' }),
})

export type TLoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z
   .object({
      email: z
         .string()
         .min(1, { message: 'Please fill out your email address' })
         .email({ message: 'Invalid email address' })
         ,
      password: z.string().min(7, 'Password must be at least 7 characters'),
      confirmPassword: z.string(),
   })
   .refine((data) => data.confirmPassword === data.password, {
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
   })

export type TRegisterSchema = z.infer<typeof registerSchema>

export type TAuthResponse = {
   success: boolean
   errors?: string[]
   statuscode?: number
   message?: string
}
export type TResponse = {
   success: boolean
   errors?: string[]
   statuscode?: number
   message?: string
}

export const resetSchema = z.object({
   email: z.string().min(1, {message: "Please fill out the input."}).email()
})
export type TResetSchema = z.infer<typeof resetSchema>


export const addRecipeSchema = z.object({
   title: z.string().min(3, 'Please choose a title for your recipe with at least 3 letters.'),
   sources: z.string().optional(),
   type: z.enum(['meat', 'vegetarian', 'vegan']).optional(),
   ingredients: z.array(z.string()).optional().or(z.boolean().optional())
})

export type TAddRecipeSchema = z.infer<typeof addRecipeSchema>

export const addRecipeServerSchema = z.object({
   title: z.string().min(3),
   image: z.string().refine(string => string.endsWith('.png')).optional(),
   authorId: z.string().uuid(),
   tags: z.string().optional(),
   sources: z.string().optional()
})