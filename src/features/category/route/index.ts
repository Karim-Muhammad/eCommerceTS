import APIRouter from "../../../common/Router";
import guardMiddleware from "../../auth/middleware/guard.middleware";
import CategoryController from "../controller";

const router = new APIRouter();

router.resource("/", CategoryController, {
  create: [guardMiddleware.adminGuard()],
  update: [guardMiddleware.adminGuard()],
  delete: [guardMiddleware.adminGuard()],
});

export default router.getRouter();
