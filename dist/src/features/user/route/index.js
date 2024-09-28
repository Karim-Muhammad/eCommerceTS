"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const guard_middleware_1 = __importDefault(require("../../auth/middleware/guard.middleware"));
const mongoId_validations_1 = __importDefault(require("../../common/validations/route-validations/mongoId-validations"));
const model_1 = __importDefault(require("../model"));
const validations_1 = __importDefault(require("../validations"));
const router = (0, express_1.Router)();
router.use(guard_middleware_1.default.adminGuard());
router.get("/", user_controller_1.default.read);
router.post("/", validations_1.default.getInstance().createUser(), user_controller_1.default.create);
router
    .route("/:id")
    .all(mongoId_validations_1.default.isMongoIdExist("id", model_1.default))
    .get(user_controller_1.default.readOne)
    .post(user_controller_1.default.create)
    .patch(user_controller_1.default.update)
    .delete(user_controller_1.default.delete);
router.post("/:id/block", mongoId_validations_1.default.isMongoIdExist("id", model_1.default), user_controller_1.default.block);
router.post("/:id/unblock", mongoId_validations_1.default.isMongoIdExist("id", model_1.default), user_controller_1.default.unblock);
exports.default = router;
//# sourceMappingURL=index.js.map