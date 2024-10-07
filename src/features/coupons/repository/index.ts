import Repository from "../../../common/Repository";
import CouponModel from "../model";
import { ICouponDocument } from "../types";

class CouponRepository extends Repository<ICouponDocument> {
  constructor() {
    super(CouponModel);
  }
}

export default CouponRepository;
