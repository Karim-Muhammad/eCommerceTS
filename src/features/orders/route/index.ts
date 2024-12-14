import APIRouter from "../../../common/Router";
import OrderController from "../controller";

const router = new APIRouter();

router.resource("/orders", new OrderController());

export default router.getRouter();
