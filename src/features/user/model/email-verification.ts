import mongoose, { HydratedDocument, model, Model, Schema } from "mongoose";
import UserAccount from "./auth-schema";
import { IEmailVerification, IUserAccount } from "./types";

// ==================== EmailVerification Instance Methods ====================
// instance methods (for document)
export interface IEmailVerificationMethods {
  /**
   * instance method in `EmailVerification` Document
   * @method user
   * @description get the user account of this record in EmailVerification collection (if exist)
   * @returns {Promise<HydratedDocument<IUserAccount> | null>}
   */
  user: () => Promise<HydratedDocument<IUserAccount> | null>;
}

// ==================== EmailVerification Model ====================
export interface EmailVerificationModel
  extends Model<IEmailVerification, unknown, IEmailVerificationMethods> {
  /**
   * static method in `EmailVerification` Model
   * @param userId
   * @description Check if the user exist in this collection (so that user has not verified yet)
   * @returns {Promise<boolean>}
   */
  isVerified: (userId: mongoose.Types.ObjectId) => Promise<boolean>;
}

// ==================== EmailVerification Schema ====================
export const EmailVerificationSchema = new Schema<
  IEmailVerification,
  EmailVerificationModel,
  IEmailVerificationMethods
>({
  UserId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "UserAccount",
  },
  ConfirmationToken: { type: String, required: true },
  ConfirmationTokenExpiry: { type: Date, required: true },
});

// ==================== EmailVerification Static Methods ====================
EmailVerificationSchema.statics.isVerified = async function (
  UserId: mongoose.Types.ObjectId
) {
  return (await this.findOne({ UserId })) === null;
};

// ==================== EmailVerification Instance Methods ====================
EmailVerificationSchema.methods.user = async function () {
  return await UserAccount.findById(this.UserId);
};

// ==================== EmailVerification Model ====================
export const EmailVerification: EmailVerificationModel = model<
  IEmailVerification,
  EmailVerificationModel
>("EmailVerification", EmailVerificationSchema);
