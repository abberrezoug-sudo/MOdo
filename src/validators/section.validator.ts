import { z } from "zod";

export const createSectionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Section name must contain at least 2 characters.")
    .max(50, "Section name cannot exceed 50 characters."),

  description: z
    .string()
    .trim()
    .max(255, "Description cannot exceed 255 characters.")
    .optional(),

  displayOrder: z
    .number()
    .int()
    .min(0)
    .optional(),

  isVisible: z
    .boolean()
    .optional(),
});

export type CreateSectionDto = z.infer<typeof createSectionSchema>;