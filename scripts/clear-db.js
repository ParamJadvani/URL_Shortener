import db from "../config/db.js"; // adjust path as needed
import url from "../schema/short-url-schema.js";
import user from "../schema/user-schema.js";

// Option 1: Truncate (faster, resets AUTO_INCREMENT)
await db.execute(`SET FOREIGN_KEY_CHECKS = 0`);
await db.execute(`TRUNCATE TABLE url`);
await db.execute(`TRUNCATE TABLE user`);
await db.execute(`SET FOREIGN_KEY_CHECKS = 1`);

// Option 2: Delete (if you want to preserve AUTO_INCREMENT IDs)
await db.delete(url);
await db.delete(user);

console.log("✅ All data deleted");
process.exit(0);
