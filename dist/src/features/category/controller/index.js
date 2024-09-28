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
const repository_1 = __importDefault(require("../repository"));
const helpers_1 = require("../../../common/helpers");
const ErrorAPI_1 = __importDefault(require("../../../common/ErrorAPI"));
class CategoryController {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
        this.create = (0, helpers_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.create(req.body);
            return (0, helpers_1.apiResponse)(res, 201, "Category created", { category });
        }));
        this.read = (0, helpers_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("Reading categories");
            const categories = yield this.categoryRepository.read({});
            if (categories.length === 0)
                return next(ErrorAPI_1.default.notFound("No categories found"));
            return (0, helpers_1.apiResponse)(res, 200, "Categories found", { categories });
        }));
        this.readOne = (0, helpers_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.readOne({
                _id: req.params.id,
            });
            return (0, helpers_1.apiResponse)(res, 200, "Category found", { category });
        }));
        this.update = (0, helpers_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.update({ _id: req.params.id }, req.body);
            return (0, helpers_1.apiResponse)(res, 200, "Category updated", { category });
        }));
        this.delete = (0, helpers_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.delete({
                _id: req.params.id,
            });
            return (0, helpers_1.apiResponse)(res, 200, "Category deleted", { category });
        }));
    }
}
exports.default = new CategoryController(new repository_1.default());
//# sourceMappingURL=index.js.map