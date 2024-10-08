import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../common/helpers";
import CartRepository from "../repository";

// IDEA: Middleware to load the cart of the authenticated user (unnecessary i think)
const loadCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let cart = await new CartRepository().readOne({ user: req.user?.id });

    if (!cart) {
      cart = await new CartRepository().create({ user: req.user?.id });
    }

    req.cart = cart;

    next();
  }
);

export default loadCart;
