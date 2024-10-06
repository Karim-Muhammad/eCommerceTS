import { NextFunction, Request, Response } from "express";
import { apiResponse, catchAsync } from "../../../common/helpers";
import ProductRepository from "../../products/repository";
import ErrorAPI from "../../../common/ErrorAPI";

class RatingsController {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  /**
   * @description Get all ratings of a product
   * @method GET
   * @route /api/products/:productId/ratings
   */
  read = catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params;

    const query = this.productRepository
      .readOne({ _id: productId })
      .populate("ratings.user", "first_name last_name email");

    const { data, pagination } =
      await this.productRepository.readWithQueryFeatures(query, req);

    return apiResponse(res, 200, "Ratings fetched successfully", {
      ratings: data.map((product) => product.ratings),
      pagination,
    });
  });

  /**
   * @description Get one rating of a product
   * @method GET
   * @route /api/products/:productId/ratings/:id
   */
  readOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { productId, id: ratingId } = req.params;

      const product = await this.productRepository.readOne({
        _id: productId,
        "ratings._id": ratingId,
      });

      if (!product) {
        return next(ErrorAPI.notFound("Rating not found"));
      }

      return apiResponse(res, 200, "Rating fetched successfully", {
        rating: product.ratings[0],
      });
    }
  );

  /**
   * @description Create a new rating for a product
   * @method POST
   * @route /api/products/:productId/ratings
   */
  create = catchAsync(async (req: Request, res: Response) => {
    console.log("Create Rating");

    const { user, body } = req;
    const { productId } = req.params;
    const { stars, review } = body;
    console.log("User ID", user.id);

    const rating = {
      user: user.id,
      stars,
      review,
    };

    console.log("Product ID", productId);

    const productRating = await this.productRepository.change({
      selector: { _id: productId },
      data: {},
      update: {
        $push: { ratings: rating },
      },
    });

    return apiResponse(res, 201, "Rating created successfully", {
      rating: productRating.ratings[productRating.ratings.length - 1],
    });
  });

  /**
   * @description Update a rating of a product
   * @method PATCH
   * @route /api/products/:productId/ratings/:id
   */
  update = catchAsync(async (req: Request, res: Response) => {
    const { productId, id: ratingId } = req.params;
    const { user, body } = req;
    const { stars, review } = body;

    const product = await this.productRepository.change({
      selector: {
        _id: productId,
        "ratings._id": ratingId,
        "ratings.user": user.id,
      },
      data: {},
      update: {
        $set: {
          "ratings.$[rating].stars": stars,
          "ratings.$[rating].review": review,
        },
      },

      options: {
        arrayFilters: [{ "rating._id": ratingId }],
      },
    });

    return apiResponse(res, 200, "Rating updated successfully", {
      product,
    });
  });

  /**
   * @description Delete a rating of a product
   * @method DELETE
   * @route /api/products/:productId/ratings/:id
   */
  delete = catchAsync(async (req: Request, res: Response) => {
    const { productId, id: ratingId } = req.params;
    const { user } = req;

    await this.productRepository.change({
      selector: {
        _id: productId,
        "ratings.user": user.id,
        "ratings._id": ratingId,
      },
      data: {},
      update: {
        $pull: { ratings: { _id: ratingId, user: user.id } },
      },
    });

    return apiResponse(res, 204, "Rating deleted successfully");
  });
}

export default new RatingsController();
