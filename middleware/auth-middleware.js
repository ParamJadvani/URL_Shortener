// middleware/auth-middleware.js
import { verifyToken } from "../lib/jwt.js";

// Redirects to login if no valid token
export const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }
  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch {
    return res.redirect("/login");
  }
};


// Redirects to home if already logged in
export const isGuest = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      verifyToken(token);
      return res.redirect("/");
    } catch {
      res.clearCookie("token");
    }
  }
  next();
};
