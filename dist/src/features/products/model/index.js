"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema_1 = __importDefault(require("./schema"));
require("./methods");
require("./hooks");
const ProductModel = (0, mongoose_1.model)("Product", schema_1.default);
exports.default = ProductModel;
//# sourceMappingURL=index.js.map