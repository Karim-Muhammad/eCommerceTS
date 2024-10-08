import UserModel from "../../user/model";
import { DiscountType } from "../types";
import { CouponSchema } from "./schema";

CouponSchema.methods.isExpired = function () {
  return this.expiredAt < new Date();
};

CouponSchema.methods.use = async function (total: number) {
  if (this.discountType === DiscountType.PERCENTAGE) {
    total = total - (total * this.discount) / 100;
  }

  if (this.discountType === DiscountType.FIXED) {
    total = total - this.discount;
  }

  this.usageCount += 1;
  if (this.usageCount >= this.usageLimit) {
    this.isActive = false;
  }

  await this.save();

  return total;
};

CouponSchema.methods.destroy = async function () {
  await UserModel.updateMany(
    { couponsUsed: this._id },
    { $pull: { couponsUsed: this._id } }
  );

  this.deleteOne().then(() => {
    console.log("Coupon deleted successfully");
    return;
  });
};

CouponSchema.methods.useWithDestroy = async function (total: number) {
  if (this.discountType === DiscountType.PERCENTAGE) {
    total = total - (total * this.discount) / 100;
  }

  if (this.discountType === DiscountType.FIXED) {
    total = total - this.discount;
  }

  this.usageCount += 1;
  if (this.usageCount >= this.usageLimit) {
    this.destroy();
  }

  await this.save();

  return total;
};
