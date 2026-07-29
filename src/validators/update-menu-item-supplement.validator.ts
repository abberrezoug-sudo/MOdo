import { z } from "zod";
import { createMenuItemSupplementSchema } from "./create-menu-item-supplement.validator.js";

export const updateMenuItemSupplementSchema =
  createMenuItemSupplementSchema.partial();

export type UpdateMenuItemSupplementDto =
  z.infer<typeof updateMenuItemSupplementSchema>;