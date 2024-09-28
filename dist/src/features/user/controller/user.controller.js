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
const ErrorAPI_1 = __importDefault(require("../../../common/ErrorAPI"));
const repository_1 = __importDefault(require("../repository"));
const helpers_1 = require("../../../common/helpers");
class UserController {
    constructor() {
        this.read = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userRepository.read({});
                return res.status(200).json({ data });
            }
            catch (error) {
                next(ErrorAPI_1.default.badRequest(error.message));
            }
        });
        this.readOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            try {
                const data = yield this.userRepository.readOne({ _id: params.id });
                return res.status(200).json({ data });
            }
            catch (error) {
                next(ErrorAPI_1.default.badRequest(error.message));
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { params, body } = req;
            try {
                const updatedData = yield this.userRepository.update({ _id: params.id }, body);
                return res.status(200).json({
                    data: updatedData,
                });
            }
            catch (error) {
                next(ErrorAPI_1.default.badRequest(error.message));
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            try {
                const data = yield this.userRepository.delete({ _id: params.id });
                return res.status(200).json({
                    data,
                });
            }
            catch (error) {
                next(ErrorAPI_1.default.badRequest(error.message));
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const data = yield this.userRepository.create(body);
                return res.status(201).json({
                    data,
                });
            }
            catch (error) {
                next(ErrorAPI_1.default.badRequest(error.message));
            }
        });
        this.block = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const currentUser = req.user;
            try {
                const targetUser = yield this.userRepository.readOne({ _id: id });
                if (targetUser.id === currentUser.id)
                    next(ErrorAPI_1.default.badRequest("You cannot block yourself!"));
                targetUser.status = false;
                yield yield targetUser.save();
                return (0, helpers_1.apiResponse)(res, 200, `You blocked the user <${currentUser.first_name}>`);
            }
            catch (error) {
                next(ErrorAPI_1.default.internal(error.message));
            }
        });
        this.unblock = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const currentUser = req.user;
            try {
                const targetUser = yield this.userRepository.readOne({ _id: id });
                if (targetUser.id === currentUser.id)
                    return next(ErrorAPI_1.default.badRequest("You cannot unblock yourself!"));
                targetUser.status = true;
                targetUser.save();
                return (0, helpers_1.apiResponse)(res, 200, `You unblocked the user <${currentUser.first_name}>`);
            }
            catch (error) {
                next(ErrorAPI_1.default.internal(error.message));
            }
        });
        this.userRepository = new repository_1.default();
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map