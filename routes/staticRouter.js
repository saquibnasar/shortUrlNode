const express = require("express");
const router = express.Router();
const Url = require("../models/url");
router.get("/", async (req, res) => {
  const urls = await Url.find({});

  res.render("home", { urls: urls });
});
router.get("/signup", async (req, res) => {
  res.render("signUp");
});

module.exports = router;
