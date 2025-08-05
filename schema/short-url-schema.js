import { foreignKey, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import userTable from "./user-schema.js";


const shortUrlTable = mysqlTable("url", {
  id: int().autoincrement().primaryKey(),
  userId: int("user_id").notNull().references(() => userTable.id),
  short_code: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().onUpdateNow(),
});

export default shortUrlTable;