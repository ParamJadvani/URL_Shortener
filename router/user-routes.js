import { Router } from "express";
import UserController from "../controller/user-controller.js";

const router = Router();

// Get all users
router.get("/", UserController.getAllUsers);

// Get user by ID
router.get("/:id", UserController.getUserById);

// Create a new user
router.post("/", UserController.createUser);

// Update user by ID
router.put("/:id", UserController.updateUser);

// Delete user by ID
router.delete("/:id", UserController.deleteUser);

export default router;
