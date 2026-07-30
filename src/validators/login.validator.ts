import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username is required."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});

export type LoginDto = z.infer<typeof loginSchema>;