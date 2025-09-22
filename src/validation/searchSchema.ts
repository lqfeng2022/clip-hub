import { z } from 'zod'

export const searchSchema = z.object({
  content: z.string()
    .max(30, 'Make sure list title has no more than 30 characters.'),
})

export type SearchForm = z.infer<typeof searchSchema>