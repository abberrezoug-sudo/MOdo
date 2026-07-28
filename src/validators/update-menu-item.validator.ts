import { z } from "zod";
import { createMenuItemSchema } from "./create-menu-item.validator.js";

export const updateMenuItemSchema =
  createMenuItemSchema.partial();

export type UpdateMenuItemDto =
  z.infer<typeof updateMenuItemSchema>;