import { Router } from "express";
const router = Router();

router.get("/");
router.post("/");

router.route("/:id").all().get().put().delete();

export default router;
