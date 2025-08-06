import { Router } from "express";
import URLRouter from "./short-url-route.js";
import PagesRouter from "./static-pages-route.js"
import UserRouter from "./user-route.js"
import { isLoggedIn } from "../middleware/auth-middleware.js";

const router = Router();
router.use("/",PagesRouter)
router.use("/urls",isLoggedIn, URLRouter);
router.use("/users", UserRouter);
export default router;
