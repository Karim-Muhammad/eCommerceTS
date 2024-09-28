import { Document, Model } from "mongoose";

export interface IUser {
  first_name: string;
  last_name: string;

  email: string;
  password: string;
  passwordChangedAt: number;

  passwordResetToken?: string;
  passwordResetTokenExpires?: number;
  passwordResetVerified?: boolean;

  mobile?: string;
  role: string;
  status: boolean;
  refreshToken: string;
  wishlist: string[];
  address: string[];
}

export interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
  isTokenUpToDate: (tokenDate: number) => boolean;
  generateAccessToken: () => string;
  generateRefreshToken: () => Promise<string>;
  generatePasswordResetToken: () => string;
  comparePasswordResetTokenExpiration: (time: number) => boolean;
}

export interface IUserDocument extends IUser, Document, IUserMethods {
  // here instance methods
}

export interface IUserModel extends Model<IUserDocument> {
  // here static methods
  findByEmail(email: string): Promise<IUserDocument | null>;
  getRefreshToken: (refreshToken: string) => string;
  getPasswordResetToken: (token: string) => string;
}
