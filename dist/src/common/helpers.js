"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customMessage = exports.apiErrorResponse = exports.apiResponse = exports.catchAsync = exports.serveStaticFiles = void 0;
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../../config"));
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
const serveStaticFiles = (folder) => path_1.default.join(`${config_1.default.root}/static/${folder}`);
exports.serveStaticFiles = serveStaticFiles;
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => next(ErrorAPI_1.default.internal(error.message)));
    };
};
exports.catchAsync = catchAsync;
const apiResponse = (res, status, message, data = null) => {
    return res.status(status).json({
        message,
        data,
    });
};
exports.apiResponse = apiResponse;
const apiErrorResponse = (res, status, message, error = null) => {
    return res.status(status).json({
        message,
        error,
    });
};
exports.apiErrorResponse = apiErrorResponse;
const customMessage = (message) => (value, { path }) => {
    return message.replace("{VALUE}", value).replace("{PATH}", path);
};
exports.customMessage = customMessage;
//# sourceMappingURL=helpers.js.map