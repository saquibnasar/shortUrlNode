const { getSessionIdToUser } = require("../service/auth");

const checkForAuthentication = (req, res, next) => {
  const authorizationHeaderValue = req.headers["authorization"];
  if (
    !authorizationHeaderValue ||
    authorizationHeaderValue.startsWith("Bearer ")
  ) {
    return next();
  }
  const token = authorizationHeaderValue.split("Bearer ")[1];
  const user = getSessionIdToUser(token);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
};

const restrictTo = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role))
      res.status(401).json({ error: "Unauthorized" });
    return next();
  };
};

module.exports = { checkForAuthentication, restrictTo };
