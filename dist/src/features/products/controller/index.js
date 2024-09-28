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
class ProductController {
    constructor() {
        this.create = (0, helpers_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Body", req.body);
            console.log("File", req.file);
            const { body: data } = req;
            const newProduct = yield this.productRepository.create(data);
            console.log(newProduct);
            return (0, helpers_1.apiResponse)(res, 201, "New product created successfully!", {
                product: newProduct,
            });
        }));
        this.read = (0, helpers_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productRepository.read({});
            return (0, helpers_1.apiResponse)(res, 200, "All Products fetched", { products });
        }));
        this.readOne = (0, helpers_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.readOne({
                _id: req.params.id,
            });
            return (0, helpers_1.apiResponse)(res, 200, "Product fetched", { product });
        }));
        this.update = (0, helpers_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body: data, params } = req;
            const updatedProduct = yield this.productRepository.update({ _id: params.id }, data);
            return (0, helpers_1.apiResponse)(res, 200, "Product updated successfully!", {
                product: updatedProduct,
            });
        }));
        this.delete = (0, helpers_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.delete({ _id: req.params.id });
            return (0, helpers_1.apiResponse)(res, 204, "Product deleted successfully!", { product });
        }));
        this.productRepository = new repository_1.default();
    }
}
ProductController.getInstance = () => {
    if (!ProductController.instance)
        ProductController.instance = new ProductController();
    return ProductController.instance;
};
exports.default = ProductController.getInstance();
//# sourceMappingURL=index.js.map