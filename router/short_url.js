import { Router } from "express";
import { validateShortUrlInput } from "../middleware/short_url.js";
import {
  createShortUrl,
  deleteShortUrl,
  redirectToOriginalUrl,
  updateShortUrl,
} from "../controller/short_url.js";

const router = Router();

router.route("/").post(validateShortUrlInput, createShortUrl);

router.get("/:id", redirectToOriginalUrl);

router.post("/update/:id", validateShortUrlInput, updateShortUrl);

router.post("/delete/:id", deleteShortUrl);

export default router;
