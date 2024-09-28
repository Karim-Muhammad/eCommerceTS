"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Features
const route_1 = __importDefault(require("./user/route"));
const route_2 = __importDefault(require("./auth/route"));
const route_3 = __importDefault(require("./products/route"));
const route_4 = __importDefault(require("./category/route"));
const route_5 = __importDefault(require("./brands/route"));
router.use("/users", route_1.default);
router.use("/auth", route_2.default);
router.use("/brands", route_5.default);
router.use("/category", route_4.default);
router.use("/products", route_3.default);
exports.default = router;
//# sourceMappingURL=index.js.map