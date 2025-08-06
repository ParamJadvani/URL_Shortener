import argon2 from "argon2";
import { getUserData, createUser } from "../services/user-services.js";
import { generateToken } from "../lib/jwt.js";

const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
};

const setCookie = (res, user) =>
  res.cookie("token", generateToken(user), cookieOpts);

export const getRegisterPage = (req, res) => {
  res.render("signup");
};

export const getLoginPage = (req, res) => {
  res.render("login");
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      req.session.error = "All fields are required";
      return res.redirect("/signup");
    }

    const [ex] = await getUserData(email);
    if (ex) {
      req.session.error = "Email already registered";
      return res.redirect("/signup");
    }

    const user = await createUser({
      name,
      email,
      password: await argon2.hash(password),
    });

    setCookie(res, user);
    req.session.success = "Welcome!";
    res.redirect("/");
  } catch (e) {
    console.error(e);
    req.session.error = "Registration failed";
    res.redirect("/signup");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.session.error = "Email and password required";
      return res.redirect("/login");
    }

    const [user] = await getUserData(email);
    const valid = user && (await argon2.verify(user.password, password));

    if (!valid) {
      req.session.error = "Invalid credentials";
      return res.redirect("/login");
    }

    setCookie(res, user);
    req.session.success = "Logged in!";
    res.redirect("/");
  } catch (e) {
    console.error(e);
    req.session.error = "Login failed";
    res.redirect("/login");
  }
};


export const logoutUser = (req, res) => {
  res.clearCookie("token");
  req.session.success = "Logged out";
  res.redirect("/login");
};
