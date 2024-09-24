import { model } from "mongoose";

import { IProductDocument } from "../types";
import ProductSchema from "./schema";
import "./methods";
import "./hooks";

const ProductModel = model<IProductDocument>("Product", ProductSchema);

export default ProductModel;
