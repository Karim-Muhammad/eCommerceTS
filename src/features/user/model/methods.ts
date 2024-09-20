import crypto from "crypto";
import bcrypt from "bcrypt";
import UserSchema from "./schema";
import JWTServices from "../../auth/service/jwt.services";
import config from "../../../../config";

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.compareRefreshToken = async function (refreshToken: string) {
  try {
    const rTknHash = crypto
      .createHmac("sha256", config.refresh_key)
      .update(refreshToken)
      .digest("hex");

    return this.refreshToken === rTknHash;
  } catch (error) {
    console.log(error);
    return false;
  }
};

UserSchema.methods.generateRefreshToken = function () {
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
  this.save();

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

UserSchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email });
};
