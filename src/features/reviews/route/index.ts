import APIRouter from "../../../common/Router";
import guardMiddleware from "../../auth/middleware/guard.middleware";
import RatingsController from "../controller";

const router = new APIRouter({ mergeParams: true });

router.resource("/ratings/", RatingsController, {
  all: [guardMiddleware.guard()],
});

export default router.getRouter();
