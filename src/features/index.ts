import { Router } from "express";
const router = Router();

// Features
import user from "./user/route";
import auth from "./auth/route";
import products from "./products/route";
import category from "./category/route";
import brands from "./brands/route";
import blogs from "./blogs/route";

router.use("/users", user);
router.use("/auth", auth);
router.use("/brands", brands);
router.use("/category", category);
router.use("/products", products);
router.use("/blogs", blogs);

export default router;
