import { model } from "mongoose";
import { ICartDocument } from "./../types/index";
import CartSchema from "./schema";

import "./methods";
import "./hooks";

const CartModel = model<ICartDocument>("Cart", CartSchema);

export default CartModel;
