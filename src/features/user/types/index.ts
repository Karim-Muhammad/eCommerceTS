import { Document, Model } from "mongoose";

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile?: string;
}

export interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IUserDocument extends IUser, Document, IUserMethods {
  // here instance methods
}

export interface IUserModel extends Model<IUserDocument> {
  // here static methods
  findByEmail(email: string): Promise<IUserDocument | null>;
}
