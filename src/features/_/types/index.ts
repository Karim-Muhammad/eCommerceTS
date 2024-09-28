import { Document, Model } from "mongoose";

export interface I {
  name: string;
}

export interface IMethods {
  // instance methods
  method: () => void;
}

export interface IDocument extends I, IMethods, Document {}

export interface IModel extends Model<IDocument> {
  // static methods
  staticMethod: () => void;
}
