const { nanoid } = require("nanoid");
const Url = require("../models/url");
const handleGenerateNewShortUrl = async (req, res) => {
  const shortId = nanoid(8);
  const body = req.body;

  if (!body.url) return res.status(400).json({ message: "Url is required" });

  await Url.create({
    shortId,
    shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.render("home", { id: shortId });
};
const handleRedirect = async (req, res) => {
  const { shortId } = req.params;

  const entry = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timeStamp: Date.now() } } }
  );

  res.redirect(entry.redirectUrl);
};

const handleGetAnalytics = async (req, res) => {
  const { shortId } = req.params;
  const entry = await Url.findOne({ shortId });
  return res.json({
    totalClick: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
};

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleRedirect,
};
