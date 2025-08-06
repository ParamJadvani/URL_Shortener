// Validates short URL input: non-empty, pattern, valid URL
export const validateShortUrlInput = (req, res, next) => {
  const { short_code, url } = req.body;

  const codePattern = /^[A-Za-z0-9_-]+$/;
  if (!short_code || !codePattern.test(short_code)) {
    req.session.error = "Invalid or missing short code.";

    return res.redirect(req.get("Referrer") || "/");
  }

  try {
    new URL(url);
  } catch {
    req.session.error = "Invalid or missing short code.";
    return res.redirect(req.get("Referrer") || "/");
  }

  next();
};
