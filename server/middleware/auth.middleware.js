const db = require("../models");
const Token = db.tokens;
const jwt = require("../utils/jwt.util");
const configs = require("../configs/app.config");

const isAuthenticated = async (req, res, next) => {
  const cookies = req.cookies;
  try {
    const authToken = req.headers.access_token;
    if (!authToken) {
      return next(new Error("Unauthorized"));
    }

    if (!cookies?.jwt) {
      return next(new Error("Unauthorized"));
    }
    const refreshToken = JSON.parse(cookies.jwt);
    if (!refreshToken) {
      return next(new Error("Unauthorized"));
    }

    const refresh_token = await Token.findOne({
      where: { token: refreshToken },
    });
    await Token.findOne({
      where: { token: refreshToken },
    });

    if (!refresh_token) {
      return next(new Error("Unauthorized"));
    }

    let decodedToken;

    try {
      decodedToken = jwt.validateToken(refreshToken, configs.JWT_REFRESH_TOKEN);
      //return next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }

    req.user = decodedToken;
    return next();
  } catch (err) {
    return next(err);
  }
};

const generateToken = async (req, res, next) => {
  try {
    const accessToken = jwt.generateToken(
      {
        paload: {
          username: userdb.username,
          lastname: userdb.lastname,
          userType: userdb.userType,
        },
      },
      configs.JWT_SECRET_KEY,
      configs.ACCESS_TOKEN_EXPIRES
    );

    const refreshToken = jwt.generateToken(
      {
        paload: {
          username: userdb.username,
          lastname: userdb.lastname,
          userType: userdb.userType,
        },
      },
      configs.JWT_REFRESH_TOKEN,
      configs.REFRESH_TOKEN_EXPIRES
    );

    const tokens = await Token.findOne({
      where: { userid: userdb.id },
    });
  } catch (err) {}
};

module.exports = { isAuthenticated, generateToken };
