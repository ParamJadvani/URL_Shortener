import { Router } from "express";
import { isLoggedIn ,isGuest} from "../middleware/auth-middleware.js";
import { getLoginPage, getRegisterPage } from "../controller/user-controller.js";
import { listShortUrls, redirectToOriginalUrl } from "../controller/short-url-controller.js";

const router = Router();

router.get("/", isLoggedIn, listShortUrls);


router.get("/signup", isGuest,getRegisterPage);

router.get("/login", isGuest,getLoginPage);

router.get("/:id", redirectToOriginalUrl);

export default router;
