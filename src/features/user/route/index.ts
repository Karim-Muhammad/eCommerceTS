import { Router } from "express";
import UserController from "../controller/user.controller";
import guardMiddleware from "../../auth/middleware/guard.middleware";
import MongoIdValidations from "../../common/validations/route-validations/mongoId-validations";
import UserModel from "../model";
import UserValidations from "../validations";

const router = Router();

router.use(guardMiddleware.adminGuard());

router.get("/", UserController.read);

router.post(
  "/",
  UserValidations.getInstance().createUser(),
  UserController.create
);

router
  .route("/:id")
  .all(MongoIdValidations.isMongoIdExist("id", UserModel))
  .get(UserController.readOne)
  .post(UserController.create)
  .patch(UserController.update)
  .delete(UserController.delete);

router.post(
  "/:id/block",
  MongoIdValidations.isMongoIdExist("id", UserModel),
  UserController.block
);

router.post(
  "/:id/unblock",
  MongoIdValidations.isMongoIdExist("id", UserModel),
  UserController.unblock
);

export default router;
