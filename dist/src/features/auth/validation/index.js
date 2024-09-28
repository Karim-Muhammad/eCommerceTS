"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const Validations_1 = __importDefault(require("../../../common/Validations"));
const helpers_1 = require("../../../common/helpers");
const model_1 = __importDefault(require("../../user/model"));
const constants_1 = require("../../../common/constants");
class AuthValidations extends Validations_1.default {
    constructor() {
        super();
    }
    register() {
        return [
            (0, express_validator_1.body)("first_name")
                .notEmpty()
                .withMessage((0, helpers_1.customMessage)("first name is required, should be string"))
                .bail()
                .isLength({ min: 3, max: 20 })
                .withMessage("should be between 3 to 20 characters"),
            (0, express_validator_1.body)("last_name")
                .notEmpty()
                .withMessage("last name is required, should be string")
                .bail()
                .isLength({ min: 3, max: 20 })
                .withMessage("should be between 3 to 20 characters"),
            (0, express_validator_1.body)("email")
                .isEmail()
                .withMessage("must enter valid email")
                .bail()
                .custom((email) => __awaiter(this, void 0, void 0, function* () {
                return yield this.isEmailTaken(email);
            })),
            (0, express_validator_1.body)("password")
                .matches(constants_1.PASSWORD_REGEX)
                .withMessage("should be strong password(uppercase, lowercase, number, special character, min 8 characters)")
                .bail(),
            (0, express_validator_1.body)("mobile").optional().isMobilePhone("ar-EG"),
            this.validate(),
        ];
    }
    changePassword() {
        return [
            (0, express_validator_1.body)("old-password").notEmpty().withMessage("Old Password is required"),
            (0, express_validator_1.body)("new-password")
                .notEmpty()
                .withMessage("New Password is required")
                .bail()
                .matches(constants_1.PASSWORD_REGEX)
                .withMessage("should be strong password(uppercase, lowercase, number, special character, min 8 characters)"),
            (0, express_validator_1.body)("new-password-confirmation")
                .notEmpty()
                .withMessage("New Password Confirmation is reuqired")
                .bail()
                .custom((value, { req }) => {
                if (req.body["new-password"] !== value)
                    throw Error("new-password and confirmation is not matched!");
                return true;
            }),
            this.validate(),
        ];
    }
    isEmailTaken(email) {
        return model_1.default.findByEmail(email).then((document) => {
            console.log(document);
            if (document)
                throw new Error("This email is invalid");
            return true;
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AuthValidations();
        }
        return this.instance;
    }
}
AuthValidations.instance = null;
exports.default = AuthValidations;
//# sourceMappingURL=index.js.map