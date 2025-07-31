export const validateShortUrlInput = (req, res, next) => {
  const { short_code, url } = req.body;

  if (!short_code || !url) {
    return res.status(400).json({
      message: "Both 'short_code' and 'url' are required fields.",
    });
  }

  next();
};
