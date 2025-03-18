const express = require("express");
const router = express.Router();
const Url = require("../models/url");
const { restrictTo } = require("../middlewares/auth");
router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const urls = await Url.find({});

  res.render("home", { urls: urls });
});
router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
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
