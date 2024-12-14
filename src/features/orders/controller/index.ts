import { Types } from "mongoose";
import ErrorAPI from "../../../common/ErrorAPI";
import { apiResponse, catchAsync } from "../../../common/helpers";
import CartRepository from "../../carts/repository";
import OrderRepository from "../repository";

class OrderController {
  private cartRepository: CartRepository;
  private orderRepository: OrderRepository;

  constructor() {
    this.cartRepository = new CartRepository();
  }

  read = catchAsync(async (req, res, next) => {
    const user = req.user;
    const ordersOfUser = await this.orderRepository.read({
      orderedBy: user.id || user._id,
    });

    if (!ordersOfUser) {
      return next(
        ErrorAPI.notFound("Unfortuantelly, you haven't any orders right now!")
      );
    }

    return apiResponse(res, 200, "All orders are fetched successfully.", {
      orders: ordersOfUser,
    });
  });

  readOne = catchAsync(async (req, res) => {
    const user = req.user;
    const { id: orderId } = req.params;

    const orderOfUserWithThisId = await this.orderRepository.readOne({
      orderedBy: user.id,
      _id: orderId,
    });

    if (!orderOfUserWithThisId) {
      return apiResponse(res, 407, "The Order is not found!", null); // 500 for test my customization solution
    }

    return apiResponse(res, 200, "The order fetched successfully", {
      order: orderOfUserWithThisId,
    });
  });

  create = catchAsync(async (req, res, next) => {
    // Optional
    const { address: addressOfUser } = req.body;

    const user = req.user;
    const cartOfUser = await this.cartRepository.readOne({ user: user.id });

    if (!cartOfUser) {
      return next(ErrorAPI.notFound("You haven't any cart right now!"));
    }

    const order = await this.orderRepository.create({
      orderedBy: user.id,
      cart: new Types.ObjectId(cartOfUser._id),
      address: addressOfUser || user.addresses[0],
      totalPrice: cartOfUser.finalPrice(),
    });

    if (!order) {
      return next(ErrorAPI.internal("The order is not created!"));
    }

    return apiResponse(res, 201, "The order is created successfully.", {
      order,
    });
  });

  // Refund
  update = catchAsync(async (req, res, next) => {});

  // Cancel
  delete = catchAsync(async (req, res, next) => {});
}

export default OrderController;
