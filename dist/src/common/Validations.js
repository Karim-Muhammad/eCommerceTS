"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
class Validations {
    constructor() {
        this.throwMethod = ErrorAPI_1.default.badRequest;
    }
    validate() {
        return (req, res, next) => {
            const _errors = (0, express_validator_1.validationResult)(req);
            console.log(_errors);
            if (!_errors.isEmpty()) {
                const errors = _errors.array().map((error) => ({
                    // field: error.type,
                    message: error.msg,
                    field: error.path,
                }));
                console.log(errors);
                return next(this.throwMethod("Validation Error", errors));
            }
            next();
        };
    }
    static getInstance() {
        return new Validations();
    }
}
exports.default = Validations;
//# sourceMappingURL=Validations.js.map