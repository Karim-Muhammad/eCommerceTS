import { Document, Model } from "mongoose";

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  passwordChangedAt: number;
  mobile?: string;
  role: string;
  status: boolean;
  refreshToken: string;
  wishlist: string[];
  address: string[];
}

export interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
  compareRefreshToken: (refreshToken: string) => Promise<boolean>;
  isTokenUpToDate: (tokenDate: number) => boolean;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export interface IUserDocument extends IUser, Document, IUserMethods {
  // here instance methods
}

export interface IUserModel extends Model<IUserDocument> {
  // here static methods
  findByEmail(email: string): Promise<IUserDocument | null>;
}
