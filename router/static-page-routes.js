import { Router } from "express";
import PageController from "../controller/page-controller.js";

const router = Router();

router.get("/", PageController.getIndexPage);

export default router;
