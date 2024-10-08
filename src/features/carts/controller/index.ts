import { NextFunction, Request, Response } from "express";
import { apiResponse, catchAsync } from "../../../common/helpers";
import ProductRepository from "../../products/repository";
import CartRepository from "../repository";
import ErrorAPI from "../../../common/ErrorAPI";

class CartController {
  private productRepository: ProductRepository;
  private cartRepository: CartRepository;
  constructor() {
    this.productRepository = new ProductRepository();
    this.cartRepository = new CartRepository();
  }

  addItemToCart = catchAsync(async (req: Request, res: Response) => {
    const { productId, quantity, color, price } = req.body;
    const { user } = req;

    // TODO: Validation Layer - first check if there is an cart is already created for the user
    let cart = await this.cartRepository.readOne({ user: user.id });
    if (!cart) {
      // if not, create a new cart with the product he wants to add
      cart = await this.cartRepository.create({
        user: user.id,
        products: [{ product: productId, quantity, color, price }],
        totalPurePrice: price * quantity,
        priceAfterDiscount: price * quantity, // no discount applied yet
      });

      return apiResponse(res, 200, "Product added to cart", { cart });
    }

    // if the cart already exists, then check if the product is already in the cart
    const productIndex = cart.products.findIndex(
      (product) => product.product === productId
    );

    // check if the product is already in the cart, or if in the cart but with a different color
    if (
      productIndex === -1 ||
      (productIndex !== -1 && cart.products[productIndex].color !== color)
    ) {
      cart.products.push({ product: productId, quantity, color, price });
    } else {
      cart.products[productIndex].quantity += quantity;
    }

    // TODO: calculate the total price of the cart

    // TODO: calculate the total price of the cart after discount

    await cart.save();
  });

  removeItemFromCart = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { productId, color } = req.body;
      const { user } = req;

      let cart = await this.cartRepository.readOne({ user: user.id });
      if (!cart) {
        return next(
          ErrorAPI.notFound(
            "Cart not found, you cannot remove a product from a cart that does not exist"
          )
        );
      }

      const productIndex = cart.products.findIndex((product) => {
        return product.product === productId && product.color === color;
      });

      if (productIndex === -1) {
        return next(ErrorAPI.notFound("Product not found in the cart"));
      }

      cart.products.splice(productIndex, 1);

      // TODO: Re-calculate the total price of the cart

      await cart.save();
    }
  );

  getCart = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;
    const cart = await this.cartRepository.readOne({ user: user.id });

    if (!cart) {
      return apiResponse(res, 200, "Cart is empty", { cart: null });
    }

    return apiResponse(res, 200, "Cart found", { cart });
  });

  clearCart = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;
    const cart = await this.cartRepository.readOne({ user: user.id });

    if (!cart) {
      return apiResponse(res, 200, "Cart is already empty", { cart: null });
    }

    cart.products = [];
    cart.totalPurePrice = 0;
    cart.priceAfterDiscount = 0;
    cart.appliedDiscount = undefined;

    await cart.save();
  });

  increaseItemInCart = catchAsync(async (req: Request, res: Response) => {
    const { productId, color } = req.body;
    const { user } = req;

    // repeated validations - TODO: move to a middleware
    const cart = await this.cartRepository.readOne({ user: user.id });

    if (!cart) {
      return apiResponse(res, 200, "Cart is already empty", { cart: null });
    }

    const productIndex = cart.products.findIndex((product) => {
      return product.product === productId && product.color === color;
    });

    // TODO: Load the product from the database to get the price
    if (productIndex === -1) {
      cart.products.push({ product: productId, quantity: 1, color, price });
    } else {
      cart.products[productIndex].quantity += 1; // decrease the quantity of the product
    }

    // TODO: Re-calculate the total price of the cart

    await cart.save();
  });

  decreaseItemFromCart = catchAsync(async (req: Request, res: Response) => {
    const { productId, color } = req.body;
    const { user } = req;

    // repeated validations - TODO: move to a middleware
    const cart = await this.cartRepository.readOne({ user: user.id });

    if (!cart) {
      return apiResponse(res, 200, "Cart is already empty", { cart: null });
    }

    const productIndex = cart.products.findIndex((product) => {
      return product.product === productId && product.color === color;
    });

    if (productIndex === -1) {
      return apiResponse(res, 200, "Product not found in the cart", { cart });
    }

    if (cart.products[productIndex].quantity === 1) {
      cart.products.splice(productIndex, 1); // remove the product from the cart
    } else {
      cart.products[productIndex].quantity -= 1; // decrease the quantity of the product
    }

    // TODO: Re-calculate the total price of the cart

    await cart.save();
  });

  checkout = catchAsync(async (req: Request, res: Response) => {});
}

export default new CartController();

/**
 * Some Notes
 * @IDEA We can replace identifier (productId, color) with create another table/model called CartItem that will have a reference to the product and the color
 */
