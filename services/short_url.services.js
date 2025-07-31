import db from "../config/db.js";
import shortUrlTable from "../schema/short_url.js";

export const getUrls =async()=> await db.select().from(shortUrlTable);