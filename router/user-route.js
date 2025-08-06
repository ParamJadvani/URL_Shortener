import { Router } from "express";
import { registerUser,loginUser,logoutUser } from "../controller/user-controller.js";
import { isLoggedIn } from "../middleware/auth-middleware.js";

const router = Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/logout",isLoggedIn,logoutUser);

export default router;
