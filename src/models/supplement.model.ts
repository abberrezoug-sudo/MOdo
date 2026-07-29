import { Schema, model } from "mongoose";

const supplementSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
      unique: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 255,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Supplement = model(
  "Supplement",
  supplementSchema
);