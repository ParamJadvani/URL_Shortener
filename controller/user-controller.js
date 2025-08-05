import "dotenv/config";
import BaseController from "./base-controller.js";
import { AsyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByEmail } from "../services/user-service.js";

class UserController extends BaseController {
  // Get all users
  getAllUsers = this.catchAsync(async (_, res) => {
    const users = await getAllUsers();
    return this.sendSuccess(res, users);
  });

  // Get user by ID
  getUserById = this.catchAsync(async (req, res) => {
    const { id } = req.params;
    
    const users = await getUserById(id);
    const user = users[0];

    if (!user) {
      throw new AsyncErrorHandler("User not found", 404);
    }

    return this.sendSuccess(res, user);
  });

  // Create a new user
  createUser = this.catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user with email already exists
    const existingUsers = await getUserByEmail(email);
    const existingUser = existingUsers[0];

    if (existingUser) {
      throw new AsyncErrorHandler("User with this email already exists", 409);
    }

    const [newUser] = await createUser({ name, email, password });

    return this.sendSuccess(res, newUser, 201);
  });

  // Update user by ID
  updateUser = this.catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUsers = await getUserById(id);
    const existingUser = existingUsers[0];

    if (!existingUser) {
      throw new AsyncErrorHandler("User not found", 404);
    }

    // Check if another user with the same email exists (if email is being changed)
    if (email && email !== existingUser.email) {
      const duplicateUsers = await getUserByEmail(email);
      const duplicateUser = duplicateUsers[0];

      if (duplicateUser) {
        throw new AsyncErrorHandler("User with this email already exists", 409);
      }
    }

    const [updatedUser] = await updateUser(id, {
      name: name || existingUser.name,
      email: email || existingUser.email,
      password: password || existingUser.password,
      updatedAt: new Date()
    });

    return this.sendSuccess(res, updatedUser);
  });

  // Delete user by ID
  deleteUser = this.catchAsync(async (req, res) => {
    const { id } = req.params;

    // Check if user exists
    const existingUsers = await getUserById(id);
    const existingUser = existingUsers[0];

    if (!existingUser) {
      throw new AsyncErrorHandler("User not found", 404);
    }

    await deleteUser(id);

    return res.status(204).json({
      status: "success",
      data: null
    });
  });
}

export default new UserController();
