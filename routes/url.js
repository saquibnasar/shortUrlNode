const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleRedirect,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortUrl);
router.get("/analzytics/:shortId", handleGetAnalytics);
router.use("/:shortId", handleRedirect);

module.exports = router;
