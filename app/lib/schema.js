import { z } from "zod";


export const accountSchema = z.object({
     name: z.string().min(1, 'Category name is required').max(100),
     type: z.enum(['CURRENT', 'SAVINGS']),
     balance: z.string().min(1, 'Balance is required'),
     isDefault: z.boolean().default(false),
})