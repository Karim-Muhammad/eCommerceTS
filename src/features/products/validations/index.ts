import { body } from "express-validator";
import Validations from "../../../common/Validations";

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
        .bail(),

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
        .withMessage("'category' is required"),

      body("brand")
        .if(() => !isUpdate)
        .notEmpty()
        .withMessage("'brand' is required"),

      body("images")
        .if(() => !isUpdate)
        .isArray()
        .withMessage("'images' must be an array")
        .custom((value, { req }) => {}),

      body("colors")
        .if(() => !isUpdate)
        .optional()
        .isArray()
        .withMessage("'colors' must be an array")
        .custom((value, { req }) => {}),

      body("tags")
        .if(() => !isUpdate)
        .isArray()
        .withMessage("'tags' must be an array"),

      body("ratings")
        .if(() => !isUpdate)
        .isArray()
        .withMessage("'ratings' must be an array"),

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
