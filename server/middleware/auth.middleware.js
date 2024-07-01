const db = require("../models");
const Token = db.tokens;
const jwt_generate = require("../utils/jwt.util");
const jwt = require("jsonwebtoken");
const configs = require("../configs/app.config");
const AppError = require("../utils/error");

const isAuthenticated = async (req, res, next) => {
  const cookies = req.cookies;
  let decodedToken;
  let validation_error = null;

  try {
    const authToken = req.headers.access_token;
    if (!authToken) {
      return next(new Error("Unauthorized"));
    }

    if (!cookies?.jwt) {
      return next(new Error("Unauthorized"));
    }
    const refreshToken = cookies.jwt;
    if (!refreshToken) {
      return next(new Error("Unauthorized"));
    }

    let refresh_token = "";
    jwt.verify(authToken, configs.JWT_SECRET_KEY, async function (err, data) {
      if (err) {
        throw err;
      }
      console.log(data);

      if (data.exp <= Date.now()) {
        decodedToken = jwt.verify(
          refreshToken,
          configs.JWT_REFRESH_TOKEN,
          async function (err, rdata) {
            if (err) {
              throw err;
            }
            if (rdata.exp <= Date.now()) {
              res.clearCookie("jwt");

              const d_token = await Token.destroy({
                where: { token: refreshToken },
              });
              validation_error = new AppError(403, "Unauthorized");
              return validation_error;
            }
            refresh_token = await Token.findOne({
              where: { token: refreshToken },
            });

            newTokens = jwt_generate.generateTokens(rdata.payload);
            refresh_token.token = newTokens.refreshToken;
            refresh_token.save();
            res.cookie("jwt", refresh_token.token, {
              httpOnly: false,
              secure: true,
              sameSite: "None",
              maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            return rdata.payload;
          }
        );
      }

      decodedToken = data.payload;
      return;
    });

    if (validation_error) throw validation_error;

    console.log(decodedToken);

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
