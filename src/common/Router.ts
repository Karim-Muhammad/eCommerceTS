import { RequestHandler, Router } from "express";
import { ResourceApiController } from "../@types";

class APIRouter {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  resource(
    path: string,
    controller: ResourceApiController,
    middlewares: {
      [method in keyof ResourceApiController]?: RequestHandler[];
    } = {}
  ) {
    this.router.use(middlewares["all"]);

    this.router
      .route(path)
      .get(middlewares["read"], controller.read)
      .post(middlewares["create"], controller.create);

    this.router
      .route(`${path}/:id`)
      .all(middlewares["all"])
      .get(middlewares["readOne"], controller.readOne)
      .put(middlewares["update"], controller.update)
      .delete(middlewares["delete"], controller.delete);
  }

  getRouter() {
    return this.router;
  }
}

export default APIRouter;
