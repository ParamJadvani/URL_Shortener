import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core"

const shortUrlTable = mysqlTable("url", {
    id: int().autoincrement().primaryKey(),
    url:varchar({length:255}).notNull(),
    short_code:varchar({length:255}).notNull().unique(),
    createdAt:timestamp("created_at").defaultNow().notNull(),
    updatedAt:timestamp("updated_at").defaultNow().notNull().onUpdateNow()
})

export default shortUrlTable;