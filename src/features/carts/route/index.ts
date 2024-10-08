import APIRouter from "../../../common/Router";
import guardMiddleware from "../../auth/middleware/guard.middleware";
import CartController from "../controller";
const router = new APIRouter();

router.getRouter().use(guardMiddleware.guard());

router.getRouter().get("/", CartController.getCart);

router.getRouter().post("/add", CartController.addItemToCart);
router.getRouter().post("/remove", CartController.removeItemFromCart);
router.getRouter().post("/clear", CartController.clearCart);

router.getRouter().patch("/increase", CartController.increaseItemInCart);
router.getRouter().patch("/decrease", CartController.decreaseItemFromCart);

router.getRouter().get("/checkout", CartController.checkout);
