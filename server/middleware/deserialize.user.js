const { jwt } = require("../utils/jwt.util");
const configs = require("../configs/app.config");

function deserializeUser(req, res, next) {
  const { jwt } = req.cookie;

  if (!jwt) {
    return next();
  }

  const { payload } = jwt.validateToken(jwt, configs.JWT_SECRET_KEY);

  if (payload) {
    req.user = payload;
    return next();
  }
  return next();
}
