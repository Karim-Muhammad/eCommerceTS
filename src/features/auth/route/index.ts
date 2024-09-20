import { Router } from "express";
import AuthController from "../controller/auth.controller";
import AuthValidations from "../validation";
import guardMiddleware from "../middleware/guard.middleware";
import { apiResponse } from "../../../common/helpers";

const router = Router();

router.post(
  "/register",
  guardMiddleware.reverseGuard(),
  AuthValidations.getInstance().register(),
  AuthController.register
);

router.post("/login", guardMiddleware.reverseGuard(), AuthController.login);

router.post("/refresh", guardMiddleware.guard(), AuthController.refreshToken);

router.post("/logout", guardMiddleware.guard(), AuthController.logout);

router.patch(
  "/change-password",
  guardMiddleware.guard(),
  AuthValidations.getInstance().changePassword(),
  AuthController.changePassword
);

router.get("/profile", guardMiddleware.guard(), AuthController.profile);

router.get("/test-admin", guardMiddleware.adminGuard(), (req, res) =>
  apiResponse(res, 200, "OK")
);

export default router;
