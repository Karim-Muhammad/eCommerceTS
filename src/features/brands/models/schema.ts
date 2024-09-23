import { Schema } from "mongoose";
import { IBrand, IBrandMethods, IBrandModel } from "../types";

const BrandSchema = new Schema<IBrand, IBrandModel, IBrandMethods>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  slug: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  description: {
    type: String,
    required: false,
    trim: true,
  },

  image: {
    type: String,
    required: false,
    trim: true,
  },
});

export default BrandSchema;
