import { Document } from "mongoose";

export interface IAddress extends Document {
  address: string;
}
