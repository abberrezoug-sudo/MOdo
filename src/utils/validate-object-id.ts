import mongoose from "mongoose";
import { AppError } from "./app-error.js";

export const validateObjectId = (id: string): void => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid ObjectId.", 400);
  }
};