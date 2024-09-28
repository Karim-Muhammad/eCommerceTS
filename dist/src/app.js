"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("../config"));
const database_1 = __importDefault(require("../database"));
// Features
const features_1 = __importDefault(require("./features"));
class App {
    constructor() {
        App.app = (0, express_1.default)();
    }
    setupDatabase() {
        (0, database_1.default)();
    }
    setupStandardMiddlewares() {
        App.app.use(express_1.default.json());
        App.app.use(express_1.default.urlencoded({ extended: true }));
        App.app.use("/static", express_1.default.static(`${config_1.default.static}`));
        App.app.use((0, cookie_parser_1.default)());
        App.app.use((0, morgan_1.default)("dev"));
    }
    setupRoutesMiddlewares() {
        App.app.use("/", features_1.default);
    }
    static start() {
        App.self().setupDatabase();
        App.self().setupStandardMiddlewares();
        App.self().setupRoutesMiddlewares();
        return App.app;
    }
    static self() {
        if (!App.instance)
            App.instance = new App();
        return App.instance;
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map