import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  ssl: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true,
  },
});

const db = drizzle(pool);
export default db;
