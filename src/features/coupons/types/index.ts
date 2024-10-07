import mongoose from "mongoose";
import { Document, Model } from "mongoose";

export interface ICoupon extends Document {
  _id: string;
  name: string;
  discount: number;
  expiredAt: Date;

  user: mongoose.Types.ObjectId;
}

export interface ICouponMethods {
  isExpired: () => boolean;
}

export interface ICouponDocument extends ICoupon, ICouponMethods {}

export interface ICouponModel extends Model<ICouponDocument> {
  findByCode: (code: string) => ICouponDocument;
  applyDiscount: (price: number, discount: number) => number;
}
