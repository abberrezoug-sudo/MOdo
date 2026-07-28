import { z } from "zod";

export const createSectionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Section name must contain at least 2 characters.")
    .max(100, "Section name cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(255, "Description cannot exceed 255 characters.")
    .optional(),

  displayOrder: z
    .coerce
    .number()
    .int()
    .min(0)
    .default(0),
});

export type CreateSectionDto = z.infer<typeof createSectionSchema>;