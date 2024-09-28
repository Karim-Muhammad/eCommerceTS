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
const jwt_services_1 = __importDefault(require("../service/jwt.services"));
const repository_1 = __importDefault(require("../../user/repository"));
const jwt_services_2 = __importDefault(require("../service/jwt.services"));
class GuardMiddlewares {
    /**
     * @description Guard middleware - to be used in routes that should be guarded
     * @returns
     */
    guard() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const authorization = req.headers.authorization;
            // 1. Check if `headers` has Authorization field
            if (!authorization || !authorization.startsWith("Bearer"))
                return next(ErrorAPI_1.default.unauthorized("Please login first!"));
            // 2. Verify the incoming token
            const token = authorization.split(" ")[1];
            if (!token)
                return next(ErrorAPI_1.default.unauthorized("un-authenticated user - there is no token!"));
            let payload;
            try {
                payload = jwt_services_1.default.verify(token);
            }
            catch (error) {
                return next(error);
            }
            // 3. Check if this token belong to some user
            const user = yield new repository_1.default().readOne({ _id: payload.id });
            if (!user)
                return next(ErrorAPI_1.default.unauthorized("This token no longer belong to you."));
            // 4. Check if PasswordChangedAt updated than `iat` of token
            console.log("Token iat: ", payload.iat);
            console.log("PasswordChangedAt: ", user.passwordChangedAt);
            if (!user.isTokenUpToDate(payload.iat)) {
                return next(ErrorAPI_1.default.unauthorized("Please refresh the token, then do your action again."));
            }
            req.user = user;
            next();
        });
    }
    /**
     * @description Reverse the guard middleware - to be used in routes that should not be guarded
     * @returns
     */
    reverseGuard() {
        return (req, res, next) => {
            if (req.headers.authorization)
                return next(ErrorAPI_1.default.unauthorized("You are already logged in."));
            next();
        };
    }
    adminGuard() {
        return (req, res, next) => {
            this.guard()(req, res, (error) => {
                if (error)
                    return next(error);
                this.only(["admin"])(req, res, (error) => {
                    if (error)
                        return next(error);
                    next();
                });
            });
        };
    }
    vendorGuard() {
        return (req, res, next) => {
            this.guard()(req, res, (error) => {
                if (error)
                    return next(error);
                this.only(["admin"])(req, res, (error) => {
                    if (error)
                        return next(error);
                    next();
                });
            });
        };
    }
    only(roles) {
        return (req, res, next) => {
            if (!roles.includes(req.user.role))
                return next(ErrorAPI_1.default.unauthorized("You're not Allowed!"));
            next();
        };
    }
    isLoggedIn() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield new repository_1.default().readOne({ _id: req.user.id });
            if (!jwt_services_2.default.isExpired(user.refreshToken))
                return next(ErrorAPI_1.default.badRequest("Already logged in"));
            next();
        });
    }
}
exports.default = new GuardMiddlewares();
//# sourceMappingURL=guard.middleware.js.map