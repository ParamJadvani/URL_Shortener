import { Router } from "express";
import URLRouter from "./short-url-routes.js";
import PagesRouter from "./static-page-routes.js";
import UserRouter from "./user-routes.js";

const router = Router();
router.use("/", PagesRouter);
router.use("/urls", URLRouter);
router.use("/users", UserRouter);

export default router;
