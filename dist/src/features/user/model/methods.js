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
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const schema_1 = __importDefault(require("./schema"));
const jwt_services_1 = __importDefault(require("../../auth/service/jwt.services"));
const config_1 = __importDefault(require("../../../../config"));
schema_1.default.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
schema_1.default.methods.compareRefreshToken = function (refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rTknHash = crypto_1.default
                .createHmac("sha256", config_1.default.refresh_key)
                .update(refreshToken)
                .digest("hex");
            return this.refreshToken === rTknHash;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    });
};
schema_1.default.methods.generateRefreshToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = jwt_services_1.default.sign({ id: this.id, role: this.role }, config_1.default.refresh_key, "3d");
        const rTknHash = crypto_1.default
            .createHmac("sha256", config_1.default.refresh_key)
            .update(refreshToken)
            .digest("hex");
        this.refreshToken = rTknHash;
        yield this.save();
        return refreshToken;
    });
};
schema_1.default.methods.generateAccessToken = function () {
    const accessToken = jwt_services_1.default.sign({ id: this.id, role: this.role });
    return accessToken;
};
/**
 * @description Check if user has updated the password, if so, his token should be removed and re-freshed again.
 * @param tokenDate(iat) - number (date in seconds)
 * @returns {boolean}
 */
schema_1.default.methods.isTokenUpToDate = function (tokenDate) {
    return this.passwordChangedAt / 1000 < tokenDate;
};
schema_1.default.statics.findByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ email });
    });
};
//# sourceMappingURL=methods.js.map