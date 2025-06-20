const { validateJwtToken } = require("../services/token");

function checkAuthCookie(cookieName) {
  return (req, res, next) => {
    const token = req.cookies?.[cookieName];
    if (!token) {
      return res
        .status(422)
        .json({ message: "Invalid auth token: Login again" });
    }
    try {
      const payload = validateJwtToken(token);
      req.scorer = payload;
      return next();
    } catch (error) {
      return res.status(422).json({ message: "Error: " + error });
    }
  };
}

module.exports = checkAuthCookie;
