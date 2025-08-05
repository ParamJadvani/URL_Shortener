import { getUrls } from "../services/short-url-service.js";
import BaseController from "./base-controller.js";

class PageController extends BaseController {
  // Render the main index page
  getIndexPage = this.catchAsync(async (_, res) => {
    const urls = await getUrls();
    res.render('index', { urls, error: null });
  });
}

export default new PageController();
