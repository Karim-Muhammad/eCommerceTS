import { model } from "mongoose";
import OrderSchema from "./schema";
import { IOrderDocument } from "../types";

const OrderModel = model<IOrderDocument>("Order", OrderSchema);

export default OrderModel;
