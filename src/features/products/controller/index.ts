import { NextFunction, Request, Response } from "express";
import ProductRepository from "../repository";
import ErrorAPI from "../../../common/ErrorAPI";
import { apiResponse } from "../../../common/helpers";

class ProductController {
  private productRepository: ProductRepository;
  private static instance: ProductController;

  private constructor() {
    this.productRepository = new ProductRepository();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const { body: data } = req;
    return apiResponse(res, 200, "New product created successfully!", req.body);

    try {
      const newProduct = await this.productRepository.create(data);
      console.log(newProduct);

      return apiResponse(res, 201, "New product created successfully!", {
        product: newProduct,
      });
    } catch (error) {
      next(ErrorAPI.internal(error.message));
    }
  };

  read = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productRepository.read({});
      return apiResponse(res, 200, "All Products fetched", { products });
    } catch (error) {
      next(ErrorAPI.internal(error.message));
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { body: data, params } = req;
    try {
      const updatedProduct = await this.productRepository.update(
        { _id: params.id },
        data
      );

      return apiResponse(res, 200, "Product updated successfully!", {
        product: updatedProduct,
      });
    } catch (error) {
      next(ErrorAPI.internal(error.message));
    }
  };

  static getInstance = () => {
    if (!ProductController.instance)
      ProductController.instance = new ProductController();

    return ProductController.instance;
  };
}

export default ProductController.getInstance();
