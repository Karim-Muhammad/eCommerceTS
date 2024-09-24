import { Schema } from "mongoose";
import { ICategory, ICategoryMethods, ICategoryModel } from "../types";

const CategorySchema = new Schema<ICategory, ICategoryModel, ICategoryMethods>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  image: {
    type: String,
    // required: true,
  },

  count: {
    type: Number,
    default: 0,
  },
});

export default CategorySchema;
