import { Router } from "express";
const router = Router();

// Features
import user from "./user/route";
import auth from "./auth/route";

router.use("/users", user);
router.use("/auth", auth);

export default router;
