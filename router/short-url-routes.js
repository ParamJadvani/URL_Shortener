import { Router } from "express";
import ShortUrlMiddleware from "../middleware/short-url-middleware.js";
import ShortUrlController from "../controller/short-url-controller.js";

const router = Router();

router.route("/").post(ShortUrlMiddleware.validateShortUrlInput, ShortUrlController.createShortUrl);

router.get("/:id", ShortUrlController.redirectToOriginalUrl);

router.post("/update/:id", ShortUrlMiddleware.validateShortUrlInput, ShortUrlController.updateShortUrl);

router.post("/delete/:id", ShortUrlController.deleteShortUrl);

export default router;
