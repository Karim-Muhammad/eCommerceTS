import CartSchema from "./schema";

CartSchema.methods.finalPrice = function () {
  return this.priceAfterDiscount || this.totalPurePrice;
};
