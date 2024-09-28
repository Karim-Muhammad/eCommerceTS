"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN = exports.ACCESS_TOKEN = exports.EMAIL_REGEX = exports.PASSWORD_REGEX = void 0;
exports.PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
exports.EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
exports.ACCESS_TOKEN = {
    name: "access_token",
    expire_at: 1 * 24 * 60 * 60 * 1000,
};
exports.REFRESH_TOKEN = {
    name: "refresh_token",
    expire_at: 3 * 24 * 60 * 60 * 1000,
    options: {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
    },
};
//# sourceMappingURL=constants.js.map