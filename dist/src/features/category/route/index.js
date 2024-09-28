"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __importDefault(require("../../../common/Router"));
const guard_middleware_1 = __importDefault(require("../../auth/middleware/guard.middleware"));
const controller_1 = __importDefault(require("../controller"));
const router = new Router_1.default();
router.resource("/", controller_1.default, {
    create: [guard_middleware_1.default.adminGuard()],
    update: [guard_middleware_1.default.adminGuard()],
    delete: [guard_middleware_1.default.adminGuard()],
});
exports.default = router.getRouter();
//# sourceMappingURL=index.js.map