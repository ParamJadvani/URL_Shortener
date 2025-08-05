import { asyncHandler } from "../utils/asyncHandler.js";
import { AsyncErrorHandler } from "../utils/asyncErrorHandler.js";

class ShortUrlMiddleware {
  validateShortUrlInput = asyncHandler(async (req, res, next) => {
    const { short_code, url } = req.body;

    // Check if required fields are present
    if (!short_code || !url) {
      throw new AsyncErrorHandler("Both 'short_code' and 'url' are required fields", 400);
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      throw new AsyncErrorHandler("Invalid URL format", 400);
    }

    // Validate short_code length
    if (short_code.length > 255) {
      throw new AsyncErrorHandler("Short code must be less than 255 characters", 400);
    }

    next();
  });
}

export default new ShortUrlMiddleware();
