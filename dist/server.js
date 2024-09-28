"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const config_1 = __importDefault(require("./config"));
const ErrorHandler_1 = __importDefault(require("./src/common/ErrorHandler"));
const server = app_1.default.start();
server.use(ErrorHandler_1.default.handle());
ErrorHandler_1.default.unhandledPromiseRejection();
ErrorHandler_1.default.uncaughtException();
server.listen(config_1.default.serverPort, () => {
    const link = `${config_1.default.serverDomain}:${config_1.default.serverPort}`;
    console.log(`\x1b[33mServer is running at ${link} \x1b[0m`);
});
//# sourceMappingURL=server.js.map