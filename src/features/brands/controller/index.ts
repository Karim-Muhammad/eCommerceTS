import { NextFunction, Request, Response } from "express";
import { apiResponse, catchAsync } from "../../../common/helpers";
import BrandsRepository from "../repository";
import ErrorAPI from "../../../common/ErrorAPI";

class BrandsController {
  constructor(private readonly brandRepository: BrandsRepository) {}

  create = catchAsync(async (req: Request, res: Response) => {
    const brand = await this.brandRepository.create(req.body);
    return apiResponse(res, 201, "Brand created", { brand });
  });

  read = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const brands = await this.brandRepository.read({});
    if (brands.length === 0) return next(ErrorAPI.notFound("No brands found"));

    return apiResponse(res, 200, "Brands found", { brands });
  });

  readOne = catchAsync(async (req: Request, res: Response) => {
    const brand = await this.brandRepository.readOne({ _id: req.params.id });

    return apiResponse(res, 200, "Brand found", { brand });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const brand = await this.brandRepository.update(
      { _id: req.params.id },
      req.body
    );

    console.log("Brand", brand);
    return apiResponse(res, 200, "Brand updated", { brand });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    const brand = await this.brandRepository.delete({ _id: req.params.id });
    return apiResponse(res, 200, "Brand deleted", { brand });
  });
}

export default new BrandsController(new BrandsRepository());
