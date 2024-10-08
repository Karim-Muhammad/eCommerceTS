import { CouponSchema } from "./schema";

CouponSchema.pre("validate", function (next) {
  this.code = this.code.toUpperCase();
  console.log("CouponSchema.pre('validate')", this.expiredAt);
  this.expiredAt = new Date(this.expiredAt);
  next();
});
