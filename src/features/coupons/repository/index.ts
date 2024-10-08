import Repository from "../../../common/Repository";
import { IUserDocument } from "../../user/types";
import CouponModel from "../model";
import { ICouponDocument } from "../types";
import { validateCouponCode } from "../validations";

class CouponRepository extends Repository<ICouponDocument> {
  constructor() {
    super(CouponModel);
  }

  applyCoupon = async (
    code: string,
    user: IUserDocument,
    totalPrice: number
  ) => {
    const coupon = await validateCouponCode(code, user);

    const priceAfterDiscount = await coupon.useWithDestroy(totalPrice);

    return priceAfterDiscount;
  };
}

export default CouponRepository;
