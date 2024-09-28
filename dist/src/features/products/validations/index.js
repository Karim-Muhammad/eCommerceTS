"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const Validations_1 = __importDefault(require("../../../common/Validations"));
class ProductValidations extends Validations_1.default {
    mutate(isUpdate = false) {
        return [
            (0, express_validator_1.body)("name")
                .if(() => !isUpdate)
                .notEmpty()
                .withMessage("'name' is required")
                .bail()
                .isLength({ min: 3, max: 50 })
                .withMessage("'name' length (min: 3, max: 50)")
                .bail(),
            (0, express_validator_1.body)("description")
                .if(() => !isUpdate)
                .notEmpty()
                .withMessage("'description' is required")
                .bail()
                .isLength({ min: 50, max: 200 })
                .withMessage("'description' length (min: 50, max: 200)")
                .bail(),
            (0, express_validator_1.body)("price")
                .if(() => !isUpdate)
                .notEmpty()
                .withMessage("'price' is required")
                .bail()
                .isFloat({ min: 0 })
                .withMessage("'price' must be a positive number")
                .bail(),
            (0, express_validator_1.body)("quantity")
                .if(() => !isUpdate)
                .notEmpty()
                .withMessage("'quantity' is required")
                .bail()
                .isInt({ min: 1 })
                .withMessage("'quantity' must be a positive number")
                .bail(),
            (0, express_validator_1.body)("sold")
                .if(() => !isUpdate)
                .notEmpty()
                .withMessage("'sold' is required")
                .bail()
                .isInt({ min: 0 })
                .withMessage("'sold' must be a positive number")
                .bail(),
            (0, express_validator_1.body)("category")
                .if(() => !isUpdate)
                .notEmpty()
                .withMessage("'category' is required"),
            (0, express_validator_1.body)("brand")
                .if(() => !isUpdate)
                .notEmpty()
                .withMessage("'brand' is required"),
            (0, express_validator_1.body)("images")
                .if(() => !isUpdate)
                .isArray()
                .withMessage("'images' must be an array")
                .custom((value) => {
                console.log(value);
                return true;
            }),
            (0, express_validator_1.body)("colors")
                .if(() => !isUpdate)
                .optional()
                .isArray()
                .withMessage("'colors' must be an array")
                .custom((value) => {
                console.log(value);
            }),
            (0, express_validator_1.body)("tags")
                .if(() => !isUpdate)
                .isArray()
                .withMessage("'tags' must be an array"),
            (0, express_validator_1.body)("ratings")
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
exports.default = new ProductValidations();
//# sourceMappingURL=index.js.map