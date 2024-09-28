"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class APIRouter {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    resource(path, controller, middlewares = {}) {
        const applyMiddlewares = (handlers, type) => {
            // console.log("Handlers", handlers);
            if (!handlers || handlers.length === 0) {
                return [
                    (req, res, next) => {
                        console.log("Next to ", req.method, type);
                        return next();
                    },
                ];
            }
            return handlers;
        };
        this.router.use(...applyMiddlewares(middlewares["all"], "all"));
        this.router
            .route(path)
            .get(applyMiddlewares(middlewares["read"], "read"), controller.read)
            .post(applyMiddlewares(middlewares["create"], "create"), controller.create);
        this.router
            .route(`${path}:id`)
            .all(applyMiddlewares(middlewares["singleResource"], "singleResource"))
            .get(applyMiddlewares(middlewares["readOne"], "readOne"), controller.readOne)
            .patch(applyMiddlewares(middlewares["update"], "update"), controller.update)
            .delete(applyMiddlewares(middlewares["delete"], "delete"), controller.delete);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = APIRouter;
//# sourceMappingURL=Router.js.map