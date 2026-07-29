import { z } from "zod";

const supplementSchema = z.object({
  supplementId: z.string(),

  quantity: z
    .number()
    .int()
    .min(1)
    .default(1),
});

const itemSchema = z.object({
  menuItemId: z.string(),

  quantity: z
    .number()
    .int()
    .min(1, "Quantity must be at least 1."),

  supplements: z
    .array(supplementSchema)
    .optional()
    .default([]),
});

export const createTicketSchema = z.object({
  tableNumber: z
    .number()
    .int()
    .min(1, "Table number must be at least 1."),

  items: z
    .array(itemSchema)
    .min(1, "Ticket must contain at least one item."),
});

export type CreateTicketDto = z.infer<typeof createTicketSchema>;