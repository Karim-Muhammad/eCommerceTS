import { model } from "mongoose";
import { CouponSchema } from "./schema";
import { ICouponDocument } from "../types";

import "./methods";
import "./hooks";

const CouponModel = model<ICouponDocument>("Coupon", CouponSchema);

export default CouponModel;
