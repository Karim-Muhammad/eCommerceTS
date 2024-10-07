import { Schema } from "mongoose";
import { ICoupon, ICouponMethods } from "../types";

export const CouponSchema = new Schema<ICoupon, ICouponMethods>({
  name: {
    type: String,
    required: true,
    uppercase: true,
  },

  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },

  expiredAt: {
    type: Date,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
