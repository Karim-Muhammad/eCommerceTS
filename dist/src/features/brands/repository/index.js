"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = __importDefault(require("../../../common/Repository"));
const models_1 = __importDefault(require("../models"));
class BrandsRepository extends Repository_1.default {
    constructor() {
        super(models_1.default);
    }
}
exports.default = BrandsRepository;
//# sourceMappingURL=index.js.map