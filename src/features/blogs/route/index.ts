import APIRouter from "../../../common/Router";
import Storage from "../../../common/Storage";
import guardMiddleware from "../../auth/middleware/guard.middleware";
import BlogController from "../controller";

const storage = Storage.memoryStorage();
const fileFields = storage.getFileFields({ image: 1 });

const router = new APIRouter();

router.resource("/", BlogController, {
  create: [
    guardMiddleware.adminGuard(),
    storage.upload.fields(fileFields),
    storage.prepareUploadFiles(fileFields),
  ],
  update: [
    guardMiddleware.adminGuard(),
    storage.upload.fields(fileFields),
    storage.prepareUploadFiles(fileFields),
  ],
  delete: [guardMiddleware.adminGuard()],
});

router
  .getRouter()
  .patch("/:id/like", guardMiddleware.guard(), BlogController.like)
  .patch("/:id/unlike", guardMiddleware.guard(), BlogController.dislike);

export default router.getRouter();
