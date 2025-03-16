const express = require("express");
const router = express.Router();
const Url = require("../models/url");
router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const urls = await Url.find({ createdBy: req.user._id });

  res.render("home", { urls: urls });
});
router.get("/signup", async (req, res) => {
  res.render("signUp");
});
router.get("/login", async (req, res) => {
  res.render("login");
});

module.exports = router;
