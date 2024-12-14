import Repository from "../../../common/Repository";
import OrderModel from "../model";
import { IOrder } from "../types";

class OrderRepository extends Repository<IOrder> {
  constructor() {
    super(OrderModel);
  }
}

export default OrderRepository;
