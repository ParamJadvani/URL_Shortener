import { Router } from "express";
import { validateShortUrlInput } from "../middleware/short-url-middleware.js";
import {
  createShortUrl,
  updateShortUrl,
  deleteShortUrl,
} from "../controller/short-url-controller.js";
const router = Router();


router.post("/create", validateShortUrlInput, createShortUrl);
router.post("/update/:id", validateShortUrlInput, updateShortUrl);
router.post("/delete/:id", deleteShortUrl);

export default router;
