import Repository from "../../../common/Repository";
import BrandModel from "../models";
import { IBrandDocument } from "../types";

class BrandsRepository extends Repository<IBrandDocument> {
  constructor() {
    super(BrandModel);
  }
}

export default BrandsRepository;
