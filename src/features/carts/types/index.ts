import mongoose, { Document } from "mongoose";
import { IProduct } from "../../products/types";

export interface ICart extends Document {
  _id: string;

  user: mongoose.Types.ObjectId; // user id

  products: {
    product: mongoose.Types.ObjectId | IProduct; // product id
    quantity: number;
    color: string;
  }[]; // product ids

  totalPurePrice: number;

  priceAfterDiscount: number;

  appliedDiscount: mongoose.Types.ObjectId; // coupon id
}

export interface ICartMethods {
  calculateTotalPrice: () => Promise<number>;
  applyDiscount: (couponId: string) => Promise<void>;
  removeDiscount: () => Promise<void>;
  addProduct: (
    productId: string,
    quantity: number,
    color: string
  ) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export interface ICartDocument extends ICart, ICartMethods {}

export interface ICartModel extends mongoose.Model<ICartDocument> {
  findByUser: (userId: string) => ICartDocument[];
}
