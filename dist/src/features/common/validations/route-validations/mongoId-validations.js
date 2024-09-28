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
const express_validator_1 = require("express-validator");
const Validations_1 = __importDefault(require("../../../../common/Validations"));
class MongoIdValidations extends Validations_1.default {
    constructor() {
        super(...arguments);
        /**
         * @description Check if the router parameter is mongoId valid
         * @param paramId
         * @returns
         */
        this.isMongoIdValid = (paramId) => [
            (0, express_validator_1.param)(paramId)
                .notEmpty()
                .withMessage("`id` route param is empty")
                .bail()
                .isMongoId()
                .withMessage("`id` route param is not valid mongoId")
                .bail(),
            this.validate(),
        ];
        /**
         * @description Check if the router parameter is mongoId valid & exists in the collection
         * @param paramId
         * @param Model
         * @returns
         */
        this.isMongoIdExist = (paramId, Model) => [
            ...this.isMongoIdValid(paramId),
            (0, express_validator_1.param)(paramId).custom((value) => __awaiter(this, void 0, void 0, function* () {
                const document = yield Model.findById(value);
                if (!document)
                    throw Error(`'id' doesn't exist in collection (${Model.collection.collectionName})`);
                return true;
            })),
            this.validate(),
        ];
    }
}
exports.default = new MongoIdValidations();
//# sourceMappingURL=mongoId-validations.js.map