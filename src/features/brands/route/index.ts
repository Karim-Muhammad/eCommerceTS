import { Router } from "express";

const router = Router();

router.route("/").get().post();

router.route("/:id").all().get().put().delete();

export default router;
