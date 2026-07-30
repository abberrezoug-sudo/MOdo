import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .max(30, "Username must be at most 30 characters."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),

  role: z.enum(["cashier", "tablet"]),
});

export type RegisterDto = z.infer<typeof registerSchema>;