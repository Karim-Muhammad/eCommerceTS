import Repository from "../../../common/Repository";
import CartModel from "../model";
import { ICartDocument } from "../types";

class CartRepository extends Repository<ICartDocument> {
  constructor() {
    super(CartModel);
  }
}

export default CartRepository;
