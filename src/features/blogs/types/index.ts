import { Document, Model, Schema } from "mongoose";

export interface IBlog {
  title: string;
  description: string;
  image: string;
  author: Schema.Types.ObjectId;
  category: string;
  views: number;
  likes: [Schema.Types.ObjectId];
  dislikes: [Schema.Types.ObjectId];
}
export interface IBlogMethods {
  isUserLike(user: Schema.Types.ObjectId): boolean;
  isUserDislike(user: Schema.Types.ObjectId): boolean;
}
export interface IBlogDocument extends IBlog, Document, IBlogMethods {}

export interface IBlogModel extends Model<IBlogDocument> {
  getMostViewBlogs(): Promise<IBlog[]>;
}
