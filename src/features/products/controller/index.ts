import { Request, Response } from "express";
import ProductRepository from "../repository";
import {
  apiResponse,
  catchAsync,
  destroyFileFromCloudinary,
  // destroyFileFromCloudinary,
} from "../../../common/helpers";

class ProductController {
  private productRepository: ProductRepository;
  private static instance: ProductController;

  private constructor() {
    this.productRepository = new ProductRepository();
  }

  create = catchAsync(async (req: Request, res: Response) => {
    const { body: data } = req;

    const newProduct = await this.productRepository.create(data);
    console.log(newProduct);

    return apiResponse(res, 201, "New product created successfully!", {
      product: newProduct,
    });
  });

  read = catchAsync(async (req: Request, res: Response) => {
    const { data: products, pagination } =
      await this.productRepository.readWithQueryFeatures({}, req);

    console.log("Products", products);
    return apiResponse(res, 200, "All Products fetched", {
      products,
      pagination,
    });
  });

  readOne = catchAsync(async (req: Request, res: Response) => {
    const product = await this.productRepository.readOne({
      _id: req.params.id,
    });
    return apiResponse(res, 200, "Product fetched", { product });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    console.log("UPDATE Product");

    const { body: data, params } = req;
    const updatedProduct = await this.productRepository.update(
      { _id: params.id },
      data
    );

    return apiResponse(res, 200, "Product updated successfully!", {
      product: updatedProduct,
    });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    const product = await this.productRepository.delete({ _id: req.params.id });
    product.destroyImages();
    return apiResponse(res, 204, "Product deleted successfully!", { product });
  });

  deleteImage = catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { imageId } = req.body;

    await this.productRepository.update(
      { _id: productId },
      {},
      { new: true },
      {
        $pull: { images: imageId },
      }
    );

    await destroyFileFromCloudinary(imageId.split(".")[0])
      .then((result) => {
        console.log("Image deleted from cloudinary", result);
        return apiResponse(res, 204, "Image deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting image from cloudinary:", error);
        return apiResponse(res, 500, "Error deleting image from cloudinary");
      });
  });

  static getInstance = () => {
    if (!ProductController.instance)
      ProductController.instance = new ProductController();

    return ProductController.instance;
  };
}

export default ProductController.getInstance();
