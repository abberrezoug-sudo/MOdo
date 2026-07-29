import { Schema, model } from "mongoose";

const menuItemSupplementSchema = new Schema(
  {
    menuItemId: {
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
      index: true,
    },

    supplementId: {
      type: Schema.Types.ObjectId,
      ref: "Supplement",
      required: true,
      index: true,
    },

    extraPrice: {
      type: Number,
      min: 0,
      default: null,
    },

    maxQuantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

menuItemSupplementSchema.index(
  {
    menuItemId: 1,
    supplementId: 1,
  },
  {
    unique: true,
  }
);

export const MenuItemSupplement = model(
  "MenuItemSupplement",
  menuItemSupplementSchema
);