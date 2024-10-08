import ErrorAPI from "../../../common/ErrorAPI";
import { IUserDocument } from "../../user/types";
import CouponModel from "../model";

/**
 * @description Validate Coupon Code check if exist, expired, used or limit exceeded
 * @param code
 * @param user
 * @returns Coupon
 */
export const validateCouponCode = async (code: string, user: IUserDocument) => {
  try {
    const coupon = await CouponModel.findOne({ code, isActive: true });

    if (!coupon) throw ErrorAPI.badRequest("Invalid Coupon Code!");

    if (coupon.isExpired())
      throw ErrorAPI.badRequest("Coupon Code is Expired!");

    if (user.isUsedCoupon(coupon._id)) {
      throw ErrorAPI.badRequest("Coupon Code is already used by you!");
    }

    if (coupon.usageCount >= coupon.usageLimit) {
      coupon.isActive = false;
      throw ErrorAPI.badRequest("Coupon Code is Expired!");
    }

    user.couponsUsed.push(coupon._id);
    await user.save();

    return coupon;
  } catch (error) {
    throw ErrorAPI.badRequest(error.message);
  }
};
