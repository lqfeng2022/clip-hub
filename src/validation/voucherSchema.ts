import { z } from 'zod'

export const voucherSchema = z.object({
  code: z.string().length(12, '12 characters is required'),
})

export type VoucherForm = z.infer<typeof voucherSchema>