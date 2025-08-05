import db from "../config/db.js";
import shortUrlTable from "../schema/short-url-schema.js";
import { eq } from "drizzle-orm";

export const getUrls = async () => {
  return await db.select().from(shortUrlTable);
};

export const getShortUrlByCode = async (short_code) => {
  return await db.select().from(shortUrlTable).where(eq(shortUrlTable.short_code, short_code));
};

export const getShortUrlById = async (id) => {
  return await db.select().from(shortUrlTable).where(eq(shortUrlTable.id, id));
};

export const createShortUrl = async (urlData) => {
  return await db.insert(shortUrlTable).values(urlData);
};

export const updateShortUrl = async (id, urlData) => {
  return await db.update(shortUrlTable).set(urlData).where(eq(shortUrlTable.id, id));
};

export const deleteShortUrl = async (id) => {
  return await db.delete(shortUrlTable).where(eq(shortUrlTable.id, id));
};

export const checkShortCodeExists = async (short_code) => {
  return await db.select().from(shortUrlTable).where(eq(shortUrlTable.short_code, short_code));
};