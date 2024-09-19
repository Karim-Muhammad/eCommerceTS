import { Model } from "mongoose";
import { param } from "express-validator";
import Validations from "../../../../common/Validations";

class MongoIdValidations extends Validations {
  /**
   * @description Check if the router parameter is mongoId valid
   * @param paramId
   * @returns
   */
  isMongoIdValid = (paramId: string) => [
    param(paramId)
      .notEmpty()
      .withMessage("`id` route param is empty")
      .bail()
      .isMongoId()
      .withMessage("`id` route param is not valid mongoId")
      .bail(),

    this.validate(),
  ];

  /**
   * @description Check if the router parameter is mongoId valid & exists in the collection
   * @param paramId
   * @param Model
   * @returns
   */
  isMongoIdExist = <T>(paramId: string, Model: Model<T>) => [
    ...this.isMongoIdValid(paramId),

    param(paramId).custom(async (value) => {
      const document = await Model.findById(value);

      if (!document)
        throw Error(
          `'id' doesn't exist in collection (${Model.collection.collectionName})`
        );

      return true;
    }),

    this.validate(),
  ];
}

export default new MongoIdValidations();
