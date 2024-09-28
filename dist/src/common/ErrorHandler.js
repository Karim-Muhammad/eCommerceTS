"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
class ErrorHandler {
    static handle() {
        return (incomingErrors, request, response, next // eslint-disable-line
        ) => {
            let errors = incomingErrors;
            if (this.environment === "development") {
                errors = ErrorHandler.handleDev(incomingErrors);
            }
            if (this.environment === "production") {
                errors = ErrorHandler.handleProd(incomingErrors);
            }
            return response.status(errors.statusCode).json({ errors: errors });
        };
    }
    static handleDev(errors) {
        // console.log(errors);
        return {
            message: errors.message,
            pack: errors.pack,
            statusCode: errors.statusCode,
            stack: errors.stack,
        };
    }
    static handleProd(errors) {
        return {
            pack: errors.pack,
            statusCode: errors.statusCode,
        };
    }
    static unhandledPromiseRejection() {
        process.on("unhandledRejection", (error) => {
            console.log("Unhandled Promise Rejection: ", error);
            process.exit(1);
        });
    }
    static uncaughtException() {
        process.on("uncaughtException", (error) => {
            console.log("Uncaught Exception: ", error);
            process.exit(1);
        });
    }
}
ErrorHandler.environment = config_1.default.env;
exports.default = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map