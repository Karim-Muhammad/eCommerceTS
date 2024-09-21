import bcrypt from "bcrypt";
import UserSchema from "./schema";

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordChangedAt = Date.now() - 1000;
  }

  next();
});
