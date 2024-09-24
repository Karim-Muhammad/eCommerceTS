import { model } from "mongoose";

import BrandSchema from "./schema";
import "./methods";
import "./hooks";

import { IBrandDocument } from "../types";

const BrandModel = model<IBrandDocument>("Brand", BrandSchema);
export default BrandModel;
