import APIRouter from "../../../common/Router";
import guardMiddleware from "../../auth/middleware/guard.middleware";
import BrandsController from "../controller";

const router = new APIRouter();

router.resource("/", BrandsController, {
  create: [guardMiddleware.adminGuard()],
  update: [guardMiddleware.adminGuard()],
  delete: [guardMiddleware.adminGuard()],
});

export default router.getRouter();
