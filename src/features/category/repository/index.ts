import Repository from "../../../common/Repository";
import CategoryModel from "../models";
import { ICategoryDocument } from "../types";

class CategoryRepository extends Repository<ICategoryDocument> {
  constructor() {
    super(CategoryModel);
  }
}

export default CategoryRepository;
