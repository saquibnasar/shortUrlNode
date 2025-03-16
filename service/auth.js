const sessionIdToUserMap = new Map();

const setSessionIdToUser = (sessionId, user) => {
  sessionIdToUserMap.set(sessionId, user);
};

const getSessionIdToUser = (sessionId) => {
  return sessionIdToUserMap.get(sessionId);
};

module.exports = {
  setSessionIdToUser,
  getSessionIdToUser,
};
