import { asyncHandler } from "../utils/asyncHandler.js";

class BaseController {
  // Wrap controller methods with asyncHandler
  catchAsync(fn) {
    return asyncHandler(fn);
  }

  // Send success response
  sendSuccess(res, data, statusCode = 200) {
    return res.status(statusCode).json({
      status: 'success',
      data
    });
  }

  // Send error response
  sendError(res, message, statusCode = 400) {
    return res.status(statusCode).json({
      status: 'error',
      message
    });
  }
}

export default BaseController;
