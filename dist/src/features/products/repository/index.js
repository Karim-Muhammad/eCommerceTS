"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = __importDefault(require("../../../common/Repository"));
const model_1 = __importDefault(require("../model"));
class ProductRepository extends Repository_1.default {
    constructor() {
        super(model_1.default);
    }
}
exports.default = ProductRepository;
//# sourceMappingURL=index.js.map