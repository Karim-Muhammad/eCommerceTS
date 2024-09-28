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
const slugify_1 = __importDefault(require("slugify"));
const schema_1 = __importDefault(require("./schema"));
const _1 = __importDefault(require("."));
schema_1.default.pre("validate", function (next) {
    console.log("pre save hook");
    if (this.isModified("name")) {
        this.slug = (0, slugify_1.default)(this.name, { lower: true });
    }
    next();
});
// or use path().validate()
schema_1.default.pre("findOneAndUpdate", function (next) {
    console.log("pre update hook");
    const update = this.getUpdate();
    if (update && update["$set"] && update["$set"]["name"]) {
        update["$set"]["slug"] = (0, slugify_1.default)(update["$set"]["name"], {
            lower: true,
        });
    }
    next();
});
schema_1.default.path("name").validate({
    validator: function (value) {
        return __awaiter(this, void 0, void 0, function* () {
            const isNameExists = yield _1.default.countDocuments({
                name: { $eq: value },
            });
            if (isNameExists)
                return false;
            return true;
        });
    },
    message: "Brand name already exists!",
});
//# sourceMappingURL=hooks.js.map