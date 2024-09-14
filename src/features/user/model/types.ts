import mongoose, { Document, HydratedDocument } from "mongoose";

// ==================== EmailVerification Document ====================
/**
 * @interface IEmailVerification
 * @description Interface for Email Verification Schema
 *
 * @property {mongoose.Types.ObjectId} UserId - User Id
 * @property {string} ConfirmationToken - Confirmation Token
 * @property {Date} ConfirmationTokenExpiry - Confirmation Token Expiry
 */
export interface IEmailVerification extends Document {
  UserId: {
    type: mongoose.Types.ObjectId;
    ref: "UserAccount";
    required: true;
  };
  ConfirmationToken: string;
  ConfirmationTokenExpiry: Date;
}

// ==================== IPasswordReset Document ====================
/**
 * @interface IPasswordReset
 * @description Interface for Password Reset Schema
 *
 * @property {mongoose.Types.ObjectId} UserId - User Id
 * @property {string} ResetToken - Reset Token
 * @property {Date} ResetTokenExpiry - Reset Token Expiry
 */
export interface IPasswordReset {
  UserId: {
    type: mongoose.Types.ObjectId;
    required: true;
    ref: "UserAccount";
  };
  ResetToken: string;
  ResetTokenExpiry: Date;
}

// ==================== IUserProfile ====================
export interface IUserProfile {
  first_name: string;
  last_name: string;
  mobile: string;
  avatar: string;
}

// ==================== UserAccount Document ====================
export interface IUserAccount {
  profile: mongoose.Types.ObjectId | HydratedDocument<IUserProfile>;
  Username: string;
  EmailAddress: string;
  EmailVerification?:
    | mongoose.Types.ObjectId
    | HydratedDocument<IEmailVerification>;
  PasswordHash: string;
  PasswordReset?: mongoose.Types.ObjectId | HydratedDocument<IPasswordReset>;
}
