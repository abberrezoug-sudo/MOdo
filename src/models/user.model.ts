import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["cashier", "tablet"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);