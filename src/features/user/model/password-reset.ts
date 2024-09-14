// ==================== PasswordReset ====================
import mongoose, { HydratedDocument, model, Model, Schema } from "mongoose";
import { IPasswordReset, IUserAccount } from "./types";

// ==================== IPasswordReset Instance Methods ====================
export interface IPasswordResetMethods {
  user: () => Promise<HydratedDocument<IUserAccount> | null>;
}

// ==================== PasswordReset Model Methods ====================
export interface PasswordResetModel
  extends Model<IPasswordReset, unknown, IPasswordResetMethods> {
  isTokenValid: (token: string) => Promise<boolean>;
}

// ==================== PasswordReset Schema ====================
export const PasswordResetSchema = new Schema<
  IPasswordReset,
  PasswordResetModel,
  IPasswordResetMethods
>({
  UserId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "UserAccount",
  },
  ResetToken: { type: String, required: true },
  ResetTokenExpiry: { type: Date, required: true },
});

// ==================== PasswordReset Model ====================
export const PasswordReset = model<IPasswordReset, PasswordResetModel>(
  "PasswordReset",
  PasswordResetSchema
);
