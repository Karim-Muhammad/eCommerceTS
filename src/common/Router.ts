import { RequestHandler, Router, RouterOptions } from "express";
import { ResourceApiController } from "../@types";

class APIRouter {
  private router: Router;

  constructor(routerOptions?: RouterOptions) {
    this.router = Router(routerOptions || {});
  }

  resource(
    path: string,
    controller: ResourceApiController,
    middlewares: {
      [method in keyof ResourceApiController]?: RequestHandler[];
    } = {}
  ) {
    const applyMiddlewares = (handlers: RequestHandler[], type) => {
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

    this.router.use(applyMiddlewares(middlewares["all"], "all"));

    this.router
      .route(path)
      .get(applyMiddlewares(middlewares["read"], "read"), controller.read)
      .post(
        applyMiddlewares(middlewares["create"], "create"),
        controller.create
      );

    this.router
      .route(`${path}:id`)
      .all(applyMiddlewares(middlewares["singleResource"], "singleResource"))
      .get(
        applyMiddlewares(middlewares["readOne"], "readOne"),
        controller.readOne
      )
      .patch(
        applyMiddlewares(middlewares["update"], "update"),
        controller.update
      )
      .delete(
        applyMiddlewares(middlewares["delete"], "delete"),
        controller.delete
      );
  }

  getRouter() {
    return this.router;
  }
}

export default APIRouter;
