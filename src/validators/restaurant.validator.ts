import {z} from 'zod'
export const creatRaustaurantSchema = z.object({
    name: z.string().min(2).max(100),
      address: z.string().min(5),

  phone: z.string().min(8).max(20),

  tableCount: z.number().int().positive(),
})
