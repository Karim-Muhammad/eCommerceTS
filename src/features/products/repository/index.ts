import { Request } from "express";
import Repository from "../../../common/Repository";
import ProductModel from "../model";
import { IProductDocument } from "../types";
import { FilterQuery } from "mongoose";
import QueryFeatures from "../../../common/QueryFeatures";

class ProductRepository extends Repository<IProductDocument> {
  constructor() {
    super(ProductModel);
  }

  async readWithQueryFeatures(
    selector: FilterQuery<IProductDocument>,
    request: Request
  ) {
    console.log("Request Query", request.query);

    const query = super.read(selector);
    const enhanceQuery = await new QueryFeatures<IProductDocument>(
      query,
      request.query
    )
      .all()
      .search(["name"])
      .paginate();

    const mongooseQueryResult = await enhanceQuery.mongooseQuery;

    return {
      data: mongooseQueryResult,
      query: enhanceQuery.mongooseQuery,
      pagination: enhanceQuery.pagination,
    };
  }
}

export default ProductRepository;
