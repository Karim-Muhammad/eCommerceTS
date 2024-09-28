"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("../controller"));
const validations_1 = __importDefault(require("../validations"));
const Router_1 = __importDefault(require("../../../common/Router"));
const guard_middleware_1 = __importDefault(require("../../auth/middleware/guard.middleware"));
const Storage_1 = __importDefault(require("../../../common/Storage"));
// import ProductValidations from "../validations";
const router = new Router_1.default();
const storage = Storage_1.default.diskStorage();
const fileFields = storage.getFileFields({ images: 1 });
router.resource("/", controller_1.default, {
    create: [
        storage.upload.fields(fileFields),
        storage.prepareUploadFiles(fileFields),
        ...validations_1.default.create(),
        controller_1.default.create,
    ],
    update: [guard_middleware_1.default.guard(), guard_middleware_1.default.only(["admin", "vendor"])],
    delete: [guard_middleware_1.default.guard(), guard_middleware_1.default.only(["admin", "vendor"])],
});
exports.default = router.getRouter();
//# sourceMappingURL=index.js.map