// services/short-url-service.js
import db from "../config/db.js";
import shortUrlTable from "../schema/short-url-schema.js";
import { eq } from "drizzle-orm";

export async function getUrlsByUser(userId) {
  return db
    .select()
    .from(shortUrlTable)
    .where(eq(shortUrlTable.userId, userId));
}

export async function getShortUrlByShortCode(shortCode, userId) {
  return db
    .select()
    .from(shortUrlTable)
    .where(
      eq(shortUrlTable.short_code, shortCode),
      eq(shortUrlTable.userId, userId)
    );
}

export async function getShortUrlById(id) {
  return db.select().from(shortUrlTable).where(eq(shortUrlTable.id, id));
}

export async function createShortUrl(shortCode, url, userId) {
  return db.insert(shortUrlTable).values({
    short_code: shortCode,
    url,
    userId,
  });
}

export async function updateShortUrl(id,data) {
  return db
    .update(shortUrlTable)
    .set(data)
    .where(eq(shortUrlTable.id, id));
}

export async function deleteShortUrl(id) {
  return db.delete(shortUrlTable).where(eq(shortUrlTable.id, id));
}
