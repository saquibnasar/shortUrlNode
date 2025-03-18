const { getSessionIdToUser } = require("../service/auth");

const checkForAuthentication = (req, res, next) => {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();
  const token = tokenCookie;
  const user = getSessionIdToUser(token);
  req.user = user;
  console.log(token);
  return next();
};

const restrictTo = (roles = []) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role))
      res.status(401).json({ error: "Unauthorized" });
    return next();
  };
};

module.exports = { checkForAuthentication, restrictTo };
