import { z } from 'zod'

export const listSchema = z.object({
  title: z.string()
    .min(1, 'List title is required')
    .max(30, 'Make sure list title has no more than 30 characters.'),
})

export type ListForm = z.infer<typeof listSchema>