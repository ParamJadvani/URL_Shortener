import "dotenv/config";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { fileURLToPath } from "url";

import IndexRouter from "./router/index.js";
import { UpstashSessionStore } from "./lib/upstash-session-store.js";
import { isRateLimited } from "./lib/rate-limit.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ?? 3000;

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Custom Upstash Redis session store
app.use(
  session({
    store: new UpstashSessionStore(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 86400000, // 1 day
    },
  })
);

// Optional global rate limit middleware (100 req/min per IP)
app.use(async (req, res, next) => {
  const ip = req.ip;
  const limited = await isRateLimited(ip, 100, 60);
  if (limited) {
    return res.status(429).send("Too many requests — please try again later.");
  }
  next();
});


app.use((req, res, next) => {
  res.locals.success = req.session.success;
  res.locals.error = req.session.error;

  let changed = false;

  if (req.session.success) {
    delete req.session.success;
    changed = true;
  }

  if (req.session.error) {
    delete req.session.error;
    changed = true;
  }

  if (changed) {
    req.session.save(err => {
      if (err) {
        console.error("Error saving session after clearing flash:", err);
      }
      next();
    });
  } else {
    next();
  }
});


// Routes
app.use(IndexRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
