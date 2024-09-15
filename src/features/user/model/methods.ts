import bcrypt from "bcrypt";
import UserSchema from "./schema";

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
