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
const helpers_1 = require("../../../common/helpers");
const repository_1 = __importDefault(require("../repository"));
const ErrorAPI_1 = __importDefault(require("../../../common/ErrorAPI"));
class BrandsController {
    constructor(brandRepository) {
        this.brandRepository = brandRepository;
        this.create = (0, helpers_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const brand = yield this.brandRepository.create(req.body);
            return (0, helpers_1.apiResponse)(res, 201, "Brand created", { brand });
        }));
        this.read = (0, helpers_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const brands = yield this.brandRepository.read({});
            if (brands.length === 0)
                return next(ErrorAPI_1.default.notFound("No brands found"));
            return (0, helpers_1.apiResponse)(res, 200, "Brands found", { brands });
        }));
        this.readOne = (0, helpers_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const brand = yield this.brandRepository.readOne({ _id: req.params.id });
            return (0, helpers_1.apiResponse)(res, 200, "Brand found", { brand });
        }));
        this.update = (0, helpers_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const brand = yield this.brandRepository.update({ _id: req.params.id }, req.body);
            console.log("Brand", brand);
            return (0, helpers_1.apiResponse)(res, 200, "Brand updated", { brand });
        }));
        this.delete = (0, helpers_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const brand = yield this.brandRepository.delete({ _id: req.params.id });
            return (0, helpers_1.apiResponse)(res, 200, "Brand deleted", { brand });
        }));
    }
}
exports.default = new BrandsController(new repository_1.default());
//# sourceMappingURL=index.js.map