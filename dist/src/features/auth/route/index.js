"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const validation_1 = __importDefault(require("../validation"));
const guard_middleware_1 = __importDefault(require("../middleware/guard.middleware"));
const helpers_1 = require("../../../common/helpers");
const router = (0, express_1.Router)();
// ===================== Public Route =====================
router.post("/register", guard_middleware_1.default.reverseGuard(), validation_1.default.getInstance().register(), auth_controller_1.default.register);
router.post("/login", guard_middleware_1.default.reverseGuard(), auth_controller_1.default.login);
// ===================== Protected Route =====================
router.post("/refresh", guard_middleware_1.default.guard(), auth_controller_1.default.refreshToken);
router.post("/logout", guard_middleware_1.default.guard(), auth_controller_1.default.logout);
router.patch("/change-password", guard_middleware_1.default.guard(), validation_1.default.getInstance().changePassword(), auth_controller_1.default.changePassword);
router.get("/profile", guard_middleware_1.default.guard(), auth_controller_1.default.profile);
router.get("/test-admin", guard_middleware_1.default.adminGuard(), (req, res) => (0, helpers_1.apiResponse)(res, 200, "OK"));
exports.default = router;
//# sourceMappingURL=index.js.map