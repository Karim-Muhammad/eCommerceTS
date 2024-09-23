import { model } from "mongoose";

import CategorySchema from "./schema";
import "./methods";

import { ICategoryDocument } from "../types";

const CategoryModel = model<ICategoryDocument>("Category", CategorySchema);
export default CategoryModel;
