import * as svc from "../services/short-url-service.js";
import { isRateLimited } from "../lib/rate-limit.js";

const wrap = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (e) {
    console.error(e);
    req.session.error = "Something went wrong";
    res.redirect("/");
  }
};

export const listShortUrls = wrap(async (req, res) => {
  const urls = await svc.getUrlsByUser(req.user.id);
  res.render("index", { urls,req });
});

export const createShortUrl = wrap(async (req, res) => {
  const ip = req.ip;
  if (await isRateLimited(ip, 20, 60)) {
    req.session.error = "Rate limit exceeded";
    return res.redirect("/");
  }

  const { short_code, url } = req.body;
  if (!short_code || !url) {
    req.session.error = "Code and URL are required";
    return res.redirect("/");
  }

  const [ex] = await svc.getShortUrlByShortCode(short_code, req.user.id);
  if (ex) {
    req.session.error = "Code already in use";
    return res.redirect("/");
  }

  await svc.createShortUrl(short_code, url, req.user.id);
  req.session.success = "Created!";
  res.redirect("/");
});

export const updateShortUrl = wrap(async (req, res) => {
  const id = +req.params.id;
  const { short_code, url } = req.body;

  if (!short_code || !url) {
    req.session.error = "Code and URL are required";
    return res.redirect("/");
  }

  const [ex] = await svc.getShortUrlById(id);
  if (!ex || ex.userId !== req.user.id) {
    req.session.error = "Not found or unauthorized";
    return res.redirect("/");
  }

  if (ex.short_code !== short_code) {
    const [dup] = await svc.getShortUrlByShortCode(short_code, req.user.id);
    if (dup) {
      req.session.error = "Code already in use";
      return res.redirect("/");
    }
  }

  await svc.updateShortUrl(id, {short_code, url});
  req.session.success = "Updated!";
  res.redirect("/");
});

export const deleteShortUrl = wrap(async (req, res) => {
  const id = +req.params.id;
  const [ex] = await svc.getShortUrlById(id);

  if (!ex || ex.userId !== req.user.id) {
    req.session.error = "Not found or unauthorized";
    return res.redirect("/");
  }

  await svc.deleteShortUrl(id);
  req.session.success = "Deleted!";
  res.redirect("/");
});

export const redirectToOriginalUrl = wrap(async (req, res) => {
  const code = req.params?.id;
  const [rec] = await svc.getShortUrlByShortCode(code, req.user);
  if (!rec) {
    req.session.error = "Short URL not found";
    return res.redirect("/");
  }
  await svc.updateShortUrl(rec.id, {visit_count: rec.visit_count + 1});
  res.redirect(rec.url);
});
