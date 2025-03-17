const User = require("../models/user");
const { v4: uuuid } = require("uuid");
const { setSessionIdToUser } = require("../service/auth");

const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  res.render("home");
};
const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.render("login", { error: "Invalid Credentials" });
  }
  const token = setSessionIdToUser(user);
  res.cookie("uuid", token);

  return res.redirect("/");
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
