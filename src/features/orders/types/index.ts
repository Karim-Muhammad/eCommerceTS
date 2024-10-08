import mongoose, { Document } from "mongoose";

export enum OrderStatus {
  PENDING = "PENDING",
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
  DISPATCHED = "DISPATCHED",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum PaymentMethod {
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
  ONLINE = "ONLINE",
}

export interface IOrder extends Document {
  _id: string;

  orderedBy: mongoose.Types.ObjectId; // user id

  cart: mongoose.Types.ObjectId; // cart id

  status: OrderStatus;

  totalPrice: number;

  paymentMethod: PaymentMethod;

  address: string;
}

export interface IOrderMethods {
  cancelOrder: () => Promise<void>;

  isOrderCompleted: () => boolean;

  isOrderCancelled: () => boolean;
}

export interface IOrderDocument extends IOrder, IOrderMethods {}

export interface IOrderModel extends mongoose.Model<IOrderDocument> {
  findByUser: (userId: string) => IOrderDocument[];
  findByStatus: (status: OrderStatus) => IOrderDocument[];
}
