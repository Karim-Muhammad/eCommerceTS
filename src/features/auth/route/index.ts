import { Router } from "express";
import AuthController from "../controller/auth.controller";
import AuthValidations from "../validation";
import guardMiddleware from "../middleware/guard.middleware";

const router = Router();

router.post(
  "/register",
  guardMiddleware.reverseGuard(),
  AuthValidations.register(),
  AuthController.register
);
router.post("/login", guardMiddleware.reverseGuard(), AuthController.login);

router.patch(
  "/change-password",
  guardMiddleware.guard(),
  AuthValidations.changePassword(),
  AuthController.changePassword
);

router.get("/profile", guardMiddleware.guard(), AuthController.profile);

export default router;
