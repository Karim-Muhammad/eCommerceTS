import { Router } from "express";
import AuthController from "../controller/auth.controller";
import AuthValidations from "../validation";

const router = Router();

router.post("/register", AuthValidations.register(), AuthController.register);
router.post("/login", AuthController.login);

export default router;
