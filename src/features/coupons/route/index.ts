import APIRouter from "../../../common/Router";
import guardMiddleware from "../../auth/middleware/guard.middleware";
import CouponController from "../controller";

const router = new APIRouter();

router.resource("/", CouponController, {
  all: [guardMiddleware.adminGuard()],
});

export default router.getRouter();
