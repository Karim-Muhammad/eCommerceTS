"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validation_1 = __importDefault(require("../../auth/validation"));
class UserValidations extends validation_1.default {
    constructor() {
        super();
        /**
         * @description Validate the data for creating a new user
         */
        this.createUser = () => [...this.register(), (0, express_validator_1.body)("role").optional()];
    }
    static getInstance() {
        return new UserValidations();
    }
}
exports.default = UserValidations;
//# sourceMappingURL=index.js.map