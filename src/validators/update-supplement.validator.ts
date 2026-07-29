import { z } from "zod";
import { createSupplementSchema } from "./create-supplement.validator.js";
export const updateSupplementSchema =
  createSupplementSchema.partial();

export type UpdateSupplementDto =
  z.infer<typeof updateSupplementSchema>;