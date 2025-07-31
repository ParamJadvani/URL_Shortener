import { Router } from "express";
import { getUrls } from "../services/short_url.services.js";

const router = Router();
router.get("/",async (_, res) => {
    const urls =await getUrls();
    res.render('index', { urls });
});

export default router;
