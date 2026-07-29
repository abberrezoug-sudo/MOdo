import { z } from "zod";

export const createSupplementSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(80),

  description: z
    .string()
    .trim()
    .max(255)
    .optional(),

  isAvailable: z
    .coerce
    .boolean()
    .optional(),
});

export type CreateSupplementDto =
  z.infer<typeof createSupplementSchema>;