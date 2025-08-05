import "dotenv/config";
import BaseController from "./base-controller.js";
import { AsyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { createShortUrl, updateShortUrl, deleteShortUrl, getShortUrlByCode, getShortUrlById, checkShortCodeExists } from "../services/short-url-service.js";

class ShortUrlController extends BaseController {
  // Create a new short URL
  createShortUrl = this.catchAsync(async (req, res) => {
    const { short_code, url } = req.body;

    // Check if short code already exists
    const existingUrls = await checkShortCodeExists(short_code);
    const existingUrl = existingUrls[0];

    if (existingUrl) {
      throw new AsyncErrorHandler("Short code already exists", 409);
    }

    const [newUrl] = await createShortUrl({ short_code, url });

    return res.status(201).redirect("/");
  });

  // Update an existing short URL
  updateShortUrl = this.catchAsync(async (req, res) => {
    const { short_code, url } = req.body;
    const { id: short_code_id } = req.params;

    // Check if URL exists
    const existingUrls = await getShortUrlById(short_code_id);
    const existingUrl = existingUrls[0];

    if (!existingUrl) {
      throw new AsyncErrorHandler("URL not found", 404);
    }

    // Check if short code already exists (if it's being changed)
    if (short_code !== existingUrl.short_code) {
      const duplicateUrls = await checkShortCodeExists(short_code);
      const duplicateUrl = duplicateUrls[0];

      if (duplicateUrl) {
        throw new AsyncErrorHandler("Short code already exists", 409);
      }
    }

    const [updatedUrl] = await updateShortUrl(short_code_id, {
      short_code: short_code,
      url: url,
      updatedAt: new Date()
    });

    return res.status(200).redirect("/");
  });

  // Delete a short URL
  deleteShortUrl = this.catchAsync(async (req, res) => {
    const { id: short_code_id } = req.params;

    // Check if URL exists
    const existingUrls = await getShortUrlById(short_code_id);
    const existingUrl = existingUrls[0];

    if (!existingUrl) {
      throw new AsyncErrorHandler("URL not found", 404);
    }

    await deleteShortUrl(short_code_id);

    return res.status(200).redirect("/");
  });

  // Redirect to original URL
  redirectToOriginalUrl = this.catchAsync(async (req, res) => {
    const { id: short_code } = req.params;

    const urls = await getShortUrlByCode(short_code);
    const record = urls[0];

    if (!record) {
      throw new AsyncErrorHandler("Short URL not found", 404);
    }

    return res.redirect(record.url);
  });
}

export default new ShortUrlController();
