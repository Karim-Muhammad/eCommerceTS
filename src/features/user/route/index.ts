import { Router } from "express";
import UserController from "../controller/user.controller";

const router = Router();

router.get("/", UserController.read);
router.get("/:id", UserController.readOne);

export default router;
