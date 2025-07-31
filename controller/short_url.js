import "dotenv/config";
import db from "../config/db.js";
import shortUrlTable from "../schema/short_url.js";
import { eq } from "drizzle-orm";

export const createShortUrl = async (req, res) => {
  try {
    const { short_code, url } = req.body;

    await db.insert(shortUrlTable).values({ short_code, url });

    return res.status(201).redirect("/");
  } catch (error) {
    return res.status(500).json({
      error: error.message || error,
    });
  }
};

export const updateShortUrl = async (req, res) => {
  try {
    const { short_code, url } = req.body;
    const { id: short_code_id } = req.params;

    const data = await db.update(shortUrlTable)
      .set({
        short_code: short_code,
        url: url
      })
      .where(eq(shortUrlTable.id, short_code_id));

    if (data.rowCount === 0) {
      return res.status(404).json({ error: 'URL not found' });
    }

    return res.status(200).redirect("/");
  } catch (error) {
    return res.status(500).json({
      error: error.message || error,
    });
  }
};

export const deleteShortUrl = async (req,res)=>{
  try {
    const { id: short_code_id } = req.params;

    const result = await db.delete(shortUrlTable)
      .where(eq(shortUrlTable.id, short_code_id));

   if (result.rowCount === 0) {
      return res.status(404).json({ error: 'URL not found' });
    }

    return res.status(200).redirect("/")
  } catch (error) {
    return res.status(500).json({
      error: error.message || error,
    });
  }
}

export const redirectToOriginalUrl = async (req, res) => {
  try {
    const { id: short_code } = req.params;

    const [record] = await db
      .select()
      .from(shortUrlTable)
      .where(eq(shortUrlTable.short_code, short_code));

    if (!record) {
      return res.status(404).json({ message: "Short URL not found." });
    }

    return res.redirect(record.url);
  } catch (error) {
    return res.status(500).json({
      error: error.message || error,
    });
  }
};
