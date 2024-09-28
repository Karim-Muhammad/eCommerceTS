"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorAPI extends Error {
    constructor(message, statusCode, errors) {
        super(message);
        this.pack = { message: "" };
        this.pack.message = message;
        this.pack.errors = errors;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
    static notFound(message) {
        return new ErrorAPI(message, 404);
    }
    static badRequest(message, errors) {
        return new ErrorAPI(message, 400, errors);
    }
    static unauthorized(message) {
        return new ErrorAPI(message, 401);
    }
    static internal(message, errors) {
        return new ErrorAPI(message, 500, errors);
    }
    static isInstance(error) {
        return error instanceof ErrorAPI;
    }
}
exports.default = ErrorAPI;
//# sourceMappingURL=ErrorAPI.js.map