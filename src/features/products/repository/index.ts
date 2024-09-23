import Repository from "../../../common/Repository";
import ProductModel from "../model";
import { IProductDocument } from "../types";

class ProductRepository extends Repository<IProductDocument> {
  constructor() {
    super(ProductModel);
  }
}

export default ProductRepository;
