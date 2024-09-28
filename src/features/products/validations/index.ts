import { body, validationResult } from "express-validator";
import Validations from "../../../common/Validations";
import CategoryModel from "../../category/models";
import ErrorAPI from "../../../common/ErrorAPI";
import BrandModel from "../../brands/models";
import Storage from "../../../common/Storage";
import ProductModel from "../model";

class ProductValidations extends Validations {
  private mutate(isUpdate = false) {
    return [
      body("name")
        .if(() => !isUpdate)
        .notEmpty()
        .withMessage("'name' is required")
        .bail()
        .isLength({ min: 3, max: 50 })
        .withMessage("'name' length (min: 3, max: 50)")
        .bail()
        .custom(async (value) => {
          const isExist = await ProductModel.findOne({ name: value });
          if (isExist)
            throw ErrorAPI.badRequest("Product name is already be taken!");

          return true;
        }),

      body("description")
        .if(() => !isUpdate)
        .notEmpty()
        .withMessage("'description' is required")
        .bail()
        .isLength({ min: 50, max: 200 })
        .withMessage("'description' length (min: 50, max: 200)")
        .bail(),

      body("price")
        .if(() => !isUpdate)
        .notEmpty()
        .withMessage("'price' is required")
        .bail()
        .isFloat({ min: 0 })
        .withMessage("'price' must be a positive number")
        .bail(),

      body("quantity")
        .if(() => !isUpdate)
        .notEmpty()
        .withMessage("'quantity' is required")
        .bail()
        .isInt({ min: 1 })
        .withMessage("'quantity' must be a positive number")
        .bail(),

      body("sold")
        .if(() => !isUpdate)
        .notEmpty()
        .withMessage("'sold' is required")
        .bail()
        .isInt({ min: 0 })
        .withMessage("'sold' must be a positive number")
        .bail(),

      body("category")
        .if(() => !isUpdate)
        .notEmpty()
        .withMessage("'category' is required")
        .custom(async (value) => {
          const category = await CategoryModel.findById(value);
          if (!category)
            throw ErrorAPI.badRequest("This CategoryID is not exist!");

          return true;
        }),

      body("brand")
        .if(() => !isUpdate)
        .notEmpty()
        .withMessage("'brand' is required")
        .custom(async (value) => {
          const brand = await BrandModel.findById(value);
          if (!brand) throw ErrorAPI.badRequest("this BrandID is not exist!");

          return true;
        }),

      body("images")
        .if(() => !isUpdate)
        .isArray()
        .withMessage("'images' must be an array"),

      body("colors")
        .if(() => !isUpdate)
        .optional()
        .isArray()
        .withMessage("'colors' must be an array")
        .custom((value) => {
          console.log(value);

          if (!value["name"] || !value["hexCode"] || !value["quantity"])
            throw ErrorAPI.badRequest(
              "Please Enter Valid Color value (name, hexCode, quantity)!"
            );

          return true;
        }),

      body("tags")
        .if(() => !isUpdate)
        .isArray()
        .withMessage("'tags' must be an array"),

      // body("ratings")
      //   .if(() => !isUpdate)
      //   .isArray()
      //   .withMessage("'ratings' must be an array"),

      body("images").custom((images: string[], { req }) => {
        if (!validationResult(req).isEmpty()) {
          console.log("----images----", images);
          Storage.removeImagesFromStorage(images);
        }

        return true;
      }),

      this.validate(),
    ];
  }

  create() {
    return this.mutate(false);
  }

  update() {
    return this.mutate(true);
  }
}

export default new ProductValidations();
