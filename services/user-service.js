import db from "../config/db.js";
import userTable from "../schema/user-schema.js";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
  return await db.select().from(userTable);
};

export const getUserById = async (id) => {
  return await db.select().from(userTable).where(eq(userTable.id, id));
};

export const createUser = async (userData) => {
  return await db.insert(userTable).values(userData).returning();
};

export const updateUser = async (id, userData) => {
  return await db.update(userTable).set(userData).where(eq(userTable.id, id));
};

export const deleteUser = async (id) => {
  return await db.delete(userTable).where(eq(userTable.id, id));
};

export const getUserByEmail = async (email) => {
  return await db.select().from(userTable).where(eq(userTable.email, email));
};
