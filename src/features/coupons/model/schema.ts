import { Schema } from "mongoose";
import { ICoupon, ICouponMethods, DiscountType, ICouponModel } from "../types";

export const CouponSchema = new Schema<ICoupon, ICouponModel, ICouponMethods>({
  code: {
    type: String,
    required: true,
    // uppercase: true,
  },

  discountType: {
    type: String,
    enum: [DiscountType.PERCENTAGE, DiscountType.FIXED],
    default: DiscountType.PERCENTAGE,
  },

  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },

  usageLimit: {
    type: Number,
    required: true,
    default: 1,
    min: 0,
  },

  usageCount: {
    type: Number,
    default: 0,
  },

  expiredAt: {
    type: Date,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
