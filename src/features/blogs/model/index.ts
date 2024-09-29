import { model } from "mongoose";
import { IBlog, IBlogModel } from "../types";

import BlogSchema from "./schema";

import "./methods";

const BlogModel = model<IBlog, IBlogModel>("Blog", BlogSchema);

export default BlogModel;
