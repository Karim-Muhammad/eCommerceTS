"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Repository_1 = __importDefault(require("../../../common/Repository"));
const _model = (0, mongoose_1.model)("test", new mongoose_1.Schema({}));
class _Repository extends Repository_1.default {
    constructor() {
        super(_model);
    }
}
exports.default = _Repository;
//# sourceMappingURL=index.js.map