import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core"
import userTable from "./user-schema.js";

const shortUrlTable = mysqlTable("url", {
  id: int().autoincrement().primaryKey(),
  url: varchar({ length: 255 }).notNull(),
  userId: int("user_id")
    .notNull()
    .references(() => userTable.id),
  short_code: varchar({ length: 255 }).notNull().unique(),
  visit_count: int("visit_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().onUpdateNow(),
});

export default shortUrlTable;