import { NextFunction, Request, Response } from "express";
import { apiResponse, catchAsync } from "../../../common/helpers";
import CouponRepository from "../repository";
import ErrorAPI from "../../../common/ErrorAPI";

class CouponController {
  private couponRepository: CouponRepository;

  constructor() {
    this.couponRepository = new CouponRepository();
  }

  create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { body: data } = req;

      console.log("ExpiredAt", data.expiredAt);
      console.log("Parsed", Date.parse(data.expiredAt));

      if (!data.expiredAt || isNaN(Date.parse(data.expiredAt)))
        return next(ErrorAPI.badRequest("ExpiredAt is inCorrect"));

      console.log("Data", data);
      const coupon = await this.couponRepository.create({
        ...data,
        user: req.user.id,
      });

      return apiResponse(res, 201, "New Coupon is Reigstered", { coupon });
    }
  );

  read = catchAsync(async (req: Request, res: Response) => {
    const coupons = await this.couponRepository.read({ user: req.user.id });

    return apiResponse(res, 200, "All Coupons is fetched successfully", {
      coupons,
    });
  });

  readOne = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const coupon = await this.couponRepository.readOne({
      _id: id,
      user: req.user.id,
    });

    return apiResponse(res, 200, "Coupon details is fetched", { coupon });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body: data } = req;

    const updatedCoupon = await this.couponRepository.update(
      { _id: id, user: req.user.id },
      data
    );

    return apiResponse(res, 200, "Coupon is updated successfully", {
      coupon: updatedCoupon,
    });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.couponRepository.delete({ _id: id, user: req.user.id });

    return apiResponse(res, 200, "Coupon is deleted successfully");
  });

  apply = catchAsync(async (req: Request, res: Response) => {
    const { code, totalOrder } = req.body;
    const data = await this.couponRepository.applyCoupon(
      code,
      req.user,
      totalOrder
    );

    return apiResponse(res, 200, "Coupon is applied successfully", {
      priceAfterDiscount: data,
    });
  });
}

export default new CouponController();
