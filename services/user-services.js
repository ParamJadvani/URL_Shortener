import db from "../config/db.js";
import userTable from "../schema/user-schema.js";
import { eq } from "drizzle-orm";

export const createUser = async (data) => {
  await db
    .insert(userTable)
    .values({
      name: data.name,
      email: data.email,
      password: data.password,
    })
    .$returningId();
  return await getUserData(data.email);
};

export const getUserData = async (email) =>
  await db.select().from(userTable).where(eq(userTable.email, email));

export const getUserDataById = async (id) =>
  await db.select().from(userTable).where(eq(userTable.id, id));
