const { getSessionIdToUser } = require("../service/auth");

const restrictToAuthenticated = (req, res, next) => {
  const sessionId = req.cookies?.uuid;
  if (!sessionId) {
    return res.redirect("/login");
  }
  const user = getSessionIdToUser(sessionId);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
};

const checkAuth = (req, res, next) => {
  const sessionId = req.cookies?.uuid;
  const user = getSessionIdToUser(sessionId);
  req.user = user;
  next();
};

module.exports = { restrictToAuthenticated, checkAuth };
