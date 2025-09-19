import { z } from 'zod'

export const profileSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
  phone: z.string().optional(),
  birth_date: z.string().optional(),
})

export type ProfileForm = z.infer<typeof profileSchema>