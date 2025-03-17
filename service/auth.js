// tokken is a string that stores the sessionId

const jwt = require("jsonwebtoken");
const secretKey = "html@css123";

const setSessionIdToUser = (user) => {
  const playload = { _id: user?._id, email: user?.email };
  return jwt.sign(playload, secretKey);
};

const getSessionIdToUser = (token) => {
  if (!token) return null;
  return jwt.verify(token, secretKey);
};

// sessionIdToUserMap is a map that stores the sessionId and the user object

// const sessionIdToUserMap = new Map();

// const setSessionIdToUser = (sessionId, user) => {
//   sessionIdToUserMap.set(sessionId, user);
// };

// const getSessionIdToUser = (sessionId) => {
//   return sessionIdToUserMap.get(sessionId);
// };

module.exports = {
  setSessionIdToUser,
  getSessionIdToUser,
};
