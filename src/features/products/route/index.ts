import ProductController from "../controller";
import APIRouter from "../../../common/Router";
import guardMiddleware from "../../auth/middleware/guard.middleware";
// import ProductValidations from "../validations";

const router = new APIRouter();

router.resource("/", ProductController, {
  create: [guardMiddleware.guard(), guardMiddleware.only(["admin", "vendor"])],
  update: [guardMiddleware.guard(), guardMiddleware.only(["admin", "vendor"])],
  delete: [guardMiddleware.guard(), guardMiddleware.only(["admin", "vendor"])],
});

export default router.getRouter();
