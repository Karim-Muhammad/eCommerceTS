import { Schema } from "mongoose";
import { IBlog, IBlogMethods, IBlogModel } from "../types";

const BlogSchema = new Schema<IBlog, IBlogModel, IBlogMethods>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: String,

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export default BlogSchema;
