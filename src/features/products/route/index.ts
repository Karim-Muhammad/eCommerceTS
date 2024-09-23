import { Router } from "express";
import ProductController from "../controller";
import ProductValidations from "../validations";

const router = Router();

router.get("/", ProductController.read);
router.post("/", ProductValidations.create(), ProductController.create);

router
  .route("/:id")
  .all()
  .get()
  .patch(ProductValidations.update(), ProductController.update)
  .delete();

export default router;
