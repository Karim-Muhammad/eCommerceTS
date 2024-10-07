import { CouponSchema } from "./schema";

CouponSchema.pre("validate", function (next) {
  this.name = this.name.toUpperCase();
  console.log("CouponSchema.pre('validate')", this.expiredAt);
  this.expiredAt = new Date(this.expiredAt);
  next();
});
