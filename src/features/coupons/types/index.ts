import mongoose, { Types } from "mongoose";
import { Document, Model } from "mongoose";

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED",
}

export interface ICoupon extends Document {
  _id: string;
  code: string;
  discountType: DiscountType;
  discount: number;
  usageLimit: number;
  usageCount: number;
  expiredAt: Date;
  isActive: boolean;
  user: mongoose.Types.ObjectId;
}

export interface ICouponMethods {
  isExpired: () => boolean;
  use(user: Types.ObjectId, total: number): Promise<number>;
  usedBy(user: Types.ObjectId): Promise<boolean>;
  useWithDestroy(total: number): Promise<number>;
  // delete from all users which used this coupon
  destroy(): Promise<void>;
}

export interface ICouponDocument extends ICoupon, ICouponMethods {}

export interface ICouponModel extends Model<ICouponDocument> {
  findByCode: (code: string) => ICouponDocument;
  applyDiscount: (price: number, discount: number) => number;
}
