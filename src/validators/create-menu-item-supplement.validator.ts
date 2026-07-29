import { z } from "zod";

export const createMenuItemSupplementSchema = z.object({
  menuItemId: z.string().trim(),

  supplementId: z.string().trim(),

  extraPrice: z.coerce
    .number()
    .min(0)
    .nullable()
    .optional(),

  maxQuantity: z.coerce
    .number()
    .int()
    .min(1)
    .optional(),
});

export type CreateMenuItemSupplementDto =
  z.infer<typeof createMenuItemSupplementSchema>;