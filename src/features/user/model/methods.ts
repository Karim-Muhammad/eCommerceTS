import bcrypt from "bcrypt";
import UserSchema from "./schema";

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
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
