import { NextFunction, Request, Response } from "express";
import CategoryRepository from "../repository";
import { apiResponse, catchAsync } from "../../../common/helpers";
import ErrorAPI from "../../../common/ErrorAPI";

class CategoryController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  create = catchAsync(async (req: Request, res: Response) => {
    const category = await this.categoryRepository.create(req.body);

    return apiResponse(res, 201, "Category created", { category });
  });

  read = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("Reading categories");

    const categories = await this.categoryRepository.read({});
    if (categories.length === 0)
      return next(ErrorAPI.notFound("No categories found"));

    return apiResponse(res, 200, "Categories found", { categories });
  });

  readOne = catchAsync(async (req: Request, res: Response) => {
    const category = await this.categoryRepository.readOne({
      _id: req.params.id,
    });

    return apiResponse(res, 200, "Category found", { category });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const category = await this.categoryRepository.update(
      { _id: req.params.id },
      req.body
    );

    return apiResponse(res, 200, "Category updated", { category });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    const category = await this.categoryRepository.delete({
      _id: req.params.id,
    });
    return apiResponse(res, 200, "Category deleted", { category });
  });
}

export default new CategoryController(new CategoryRepository());
