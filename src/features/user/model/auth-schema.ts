import mongoose, { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import { IUserAccount } from "./types";

import ErrorAPI from "../../../common/ErrorAPI";

// `UserId` refer to `_id` of `UserCredentials` not `UserAccount`

// ==================== UserAccount Instance Methods ====================
export interface IUserAccountMethods {
  comparePassword: (password: string) => Promise<boolean>;
}

// ==================== UserAccount Model Methods ====================
export interface UserAccountModel
  extends Model<IUserAccount, unknown, IUserAccountMethods> {
  isEmailExist: (email: string) => Promise<boolean>;
}

// ==================== UserAccount Schema ====================
export const UserAccountSchema = new Schema<
  IUserAccount,
  UserAccountModel,
  IUserAccountMethods
>({
  profile: {
    type: mongoose.Types.ObjectId,
    ref: "UserAccount",
    required: true,
  },
  Username: { type: String, required: true },
  EmailAddress: { type: String, required: true },
  EmailVerification: {
    type: mongoose.Types.ObjectId,
    ref: "EmailVerification",
    required: false,
  },
  PasswordHash: { type: String, required: true },
  PasswordReset: {
    type: mongoose.Types.ObjectId,
    ref: "PasswordReset",
    required: false,
  },
});

// ==================== UserAccount Hooks ====================
UserAccountSchema.pre("save", async function (next) {
  try {
    if (this.isModified("PasswordHash"))
      this.PasswordHash = await bcrypt.hash(this.PasswordHash, 12);

    next();
  } catch (error) {
    console.log(`Somethign went wrong in Schema: ${this.collection}`, error);
    next(ErrorAPI.internal(error.message));
  }
});

// ==================== UserAccount Instance Methods ====================
UserAccountSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.PasswordHash);
};

// ==================== UserAccount Model ====================
const UserAccount = model<IUserAccount, UserAccountModel>(
  "UserAccount",
  UserAccountSchema
);

export default UserAccount;

/* ==================== HashAlgorithm [I didn't understand it well] ==================== */
