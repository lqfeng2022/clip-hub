import { z } from 'zod'

export const chatSchema = z.object({
  content: z.string()
    .min(1, 'List title is required')
    .max(3000, 'Make sure list title has no more than 3000 characters.'),
})

export type ChatForm = z.infer<typeof chatSchema>