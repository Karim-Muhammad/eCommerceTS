import APIRouter from "../../../common/Router";
import guardMiddleware from "../../auth/middleware/guard.middleware";
import WishlistController from "../controller";

const router = new APIRouter();

router.getRouter().use(guardMiddleware.guard());

router.getRouter().get("/", WishlistController.read);

router
  .getRouter()
  .post("/add", guardMiddleware.guard(), WishlistController.create);

router
  .getRouter()
  .post("/remove", guardMiddleware.guard(), WishlistController.delete);

router
  .getRouter()
  .post("/toggle", guardMiddleware.guard(), WishlistController.toggle);
export default router.getRouter();
