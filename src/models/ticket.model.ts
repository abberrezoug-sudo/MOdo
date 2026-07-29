import { Schema, model } from "mongoose";

const ticketSupplementSchema = new Schema(
  {
    supplementId: {
      type: Schema.Types.ObjectId,
      ref: "Supplement",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
quantity: {
  type: Number,
  required: true,
  min: 1,
},
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const ticketItemSchema = new Schema(
  {
    menuItemId: {
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    supplements: {
      type: [ticketSupplementSchema],
      default: [],
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const ticketSchema = new Schema(
  {
    tableNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    items: {
      type: [ticketItemSchema],
      required: true,
      validate: {
        validator: (items: any[]) => items.length > 0,
        message: "Ticket must contain at least one item.",
      },
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Ticket = model("Ticket", ticketSchema);