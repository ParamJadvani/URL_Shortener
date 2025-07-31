import { Router } from "express";
import URLRouter from "./short_url.js";
import PagesRouter from "./static-pages.js"

const router = Router();
router.use("/",PagesRouter)
router.use("/urls", URLRouter);

export default router;
