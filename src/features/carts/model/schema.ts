import { Schema } from "mongoose";
import { ICart, ICartMethods, ICartModel } from "../types";

const CartSchema = new Schema<ICart, ICartModel, ICartMethods>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],

  totalPurePrice: {
    type: Number,
    required: true,
  },

  priceAfterDiscount: {
    type: Number,
    required: true,
  },

  appliedDiscount: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
  },
});

export default CartSchema;
