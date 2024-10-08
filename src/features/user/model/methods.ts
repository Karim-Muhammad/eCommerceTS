import crypto from "crypto";
import bcrypt from "bcrypt";
import UserSchema from "./schema";
import JWTServices from "../../auth/service/jwt.services";
import config from "../../../../config";

UserSchema.statics.getRefreshToken = function (refreshToken: string) {
  return crypto
    .createHmac("sha256", config.refresh_key)
    .update(refreshToken)
    .digest("hex");
};

UserSchema.statics.getPasswordResetToken = function (token: string) {
  const resetToken = crypto.createHash("sha256").update(token).digest("hex");
  return resetToken;
};

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateRefreshToken = async function () {
  const refreshToken = JWTServices.sign(
    { id: this.id, role: this.role },
    config.refresh_key,
    "3d"
  );

  const rTknHash = crypto
    .createHmac("sha256", config.refresh_key)
    .update(refreshToken)
    .digest("hex");

  this.refreshToken = rTknHash;
  await this.save();

  return refreshToken;
};

UserSchema.methods.generateAccessToken = function () {
  const accessToken = JWTServices.sign({ id: this.id, role: this.role });
  return accessToken;
};

/**
 * @description Check if user has updated the password, if so, his token should be removed and re-freshed again.
 * @param tokenDate(iat) - number (date in seconds)
 * @returns {boolean}
 */
UserSchema.methods.isTokenUpToDate = function (tokenDate: number) {
  return this.passwordChangedAt / 1000 < tokenDate;
};

UserSchema.methods.generatePasswordResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 1000 * 60 * 30; // 30 minutes
  return token;
};

UserSchema.methods.comparePasswordResetTokenExpiration = function (
  time: number
) {
  return this.passwordResetTokenExpires === time;
};

UserSchema.methods.isUsedCoupon = function (couponId: string) {
  return this.couponsUsed.includes(couponId);
};
