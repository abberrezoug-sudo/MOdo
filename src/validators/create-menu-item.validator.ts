import { z } from "zod";

export const createMenuItemSchema = z.object({
  sectionId: z
    .string()
    .trim()
    .min(1, "Section is required."),

  name: z
    .string()
    .trim()
    .min(2, "Item name must contain at least 2 characters.")
    .max(100, "Item name cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),

  price: z.coerce
    .number()
    .min(0, "Price must be greater than or equal to 0."),
});

export type CreateMenuItemDto = z.infer<typeof createMenuItemSchema>;