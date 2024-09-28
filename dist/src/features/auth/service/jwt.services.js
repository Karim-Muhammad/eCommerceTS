"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../../config"));
const repository_1 = __importDefault(require("../../user/repository"));
const ErrorAPI_1 = __importDefault(require("../../../common/ErrorAPI"));
class JWTServices {
    static sign(payload, secret = config_1.default.secret_key, expiresIn = "1d") {
        return jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn,
        });
    }
    static verify(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.secret_key);
            return decoded;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                throw ErrorAPI_1.default.unauthorized("Token Expired!");
            }
            throw ErrorAPI_1.default.unauthorized("Invalid Token!");
        }
    }
    static isExpired(token) {
        try {
            JWTServices.verify(token);
            return false;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                return true;
            }
            // throw ErrorAPI.unauthorized("Invalid Token!");
            return true;
            // which is better when token is invalid? throw an error, or just return when needed for this function?
        }
    }
    static user(token) {
        const payload = JWTServices.verify(token);
        return new repository_1.default().readOne({ id: payload.id });
    }
}
exports.default = JWTServices;
//# sourceMappingURL=jwt.services.js.map