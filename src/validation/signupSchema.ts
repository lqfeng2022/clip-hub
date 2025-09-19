import { z } from 'zod'

export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  password2: z.string().min(8, "Password confirmation must be at least 8 characters"),
  email: z.string().email("Invalid email"),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
}).refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ["password2"],
})

export type SignupForm = z.infer<typeof signupSchema>