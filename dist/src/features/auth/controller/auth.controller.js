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
const helpers_1 = require("../../../common/helpers");
const repository_1 = __importDefault(require("../../user/repository"));
const jwt_services_1 = __importDefault(require("./../service/jwt.services"));
const constants_1 = require("../../../common/constants");
class UserController {
    constructor() {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userRepository.create(req.body);
                return (0, helpers_1.apiResponse)(res, 201, "User Created Successfully!");
            }
            catch (error) {
                next(ErrorAPI_1.default.internal(error.message));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.userRepository.readOne({ email });
                // we can separate this logic to middleware
                if (!jwt_services_1.default.isExpired(user.refreshToken))
                    return next(ErrorAPI_1.default.badRequest("Already logged in"));
                if (!user || !(yield user.comparePassword(password))) {
                    return next(ErrorAPI_1.default.unauthorized("Invalid Credentails!"));
                }
                const token = user.generateAccessToken();
                const refreshToken = yield user.generateRefreshToken();
                res.cookie(constants_1.REFRESH_TOKEN.name, refreshToken, constants_1.REFRESH_TOKEN.options);
                return (0, helpers_1.apiResponse)(res, 200, "Login Successfully!", { token });
                /**
                 * AccessToken used directly by client users
                 * RefreshToken used only when accessToken expired instead of logout and re-login again
                 */
            }
            catch (error) {
                next(ErrorAPI_1.default.internal(error.message));
            }
        });
        this.profile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.user);
            try {
                return (0, helpers_1.apiResponse)(res, 200, "Profile Data", req.user);
            }
            catch (error) {
                next(ErrorAPI_1.default.internal(error.message));
            }
        });
        this.refreshToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cookies = req.cookies;
                if (!cookies["refresh_token"])
                    return next(ErrorAPI_1.default.badRequest("There is no Refresh token in cookies (not found)"));
                const refreshToken = cookies["refresh_token"];
                const user = yield this.userRepository.readOne({ refreshToken });
                if (!user)
                    return next(ErrorAPI_1.default.notFound("Refresh token no longer belong to any user (not found)"));
                const decodedToken = jwt_services_1.default.verify(refreshToken);
                if (decodedToken.id !== user.id)
                    return next(ErrorAPI_1.default.unauthorized("Unauthorized behaviour! (id not match)"));
                const newAccessToken = user.generateAccessToken();
                return (0, helpers_1.apiResponse)(res, 200, "New Access Token returned", {
                    token: newAccessToken,
                });
            }
            catch (error) {
                next(ErrorAPI_1.default.internal(error.message));
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.user;
                const cookies = req.cookies;
                if (!cookies["refresh_token"])
                    return next(ErrorAPI_1.default.badRequest("Refresh tokens is not exist! (you already logged out)"));
                const refreshToken = cookies["refresh_token"];
                const user = yield this.userRepository.readOne({ _id: currentUser.id });
                if (!user)
                    return next(ErrorAPI_1.default.badRequest("Please Login first again! (user not found)"));
                if (user.refreshToken !== refreshToken)
                    return next(ErrorAPI_1.default.unauthorized("Unauthorized Behaviour! (refresh token not match)"));
                user.refreshToken = "";
                yield user.save();
                res.clearCookie("refresh_token", {
                    httpOnly: true,
                    secure: true,
                    maxAge: 0,
                });
                return (0, helpers_1.apiResponse)(res, 204, "Logout successfully!");
            }
            catch (error) {
                next(ErrorAPI_1.default.internal(error.message));
            }
        });
        this.changePassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            try {
                const user = yield new repository_1.default()
                    .readOne({
                    _id: currentUser.id,
                })
                    .select("password");
                if (!(yield user.comparePassword(req.body["old-password"]))) {
                    return next(ErrorAPI_1.default.badRequest("Old password you have entered is incorrect"));
                }
                // 1# first
                user.password = req.body["new-password"];
                yield user.save();
                // then, 2# second
                const token = user.generateAccessToken();
                const refreshToken = user.generateRefreshToken();
                res.clearCookie(constants_1.REFRESH_TOKEN.name, Object.assign(Object.assign({}, constants_1.REFRESH_TOKEN.options), { maxAge: 0 }));
                res.cookie(constants_1.REFRESH_TOKEN.name, refreshToken, constants_1.REFRESH_TOKEN.options);
                return (0, helpers_1.apiResponse)(res, 200, "You changed the password successfully", {
                    token,
                });
            }
            catch (error) {
                next(ErrorAPI_1.default.internal(error.message));
            }
        });
        this.userRepository = new repository_1.default();
    }
}
exports.default = new UserController();
//# sourceMappingURL=auth.controller.js.map