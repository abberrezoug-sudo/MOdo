import { Schema, model } from "mongoose";

const menuItemSchema = new Schema(
  {
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const MenuItem = model("MenuItem", menuItemSchema);