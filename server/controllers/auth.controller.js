const db = require("../models");
const User = db.user;
const Token = db.tokens;
const configs = require("../configs/app.config");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");
const { where } = require("sequelize");
const { config } = require("dotenv");
const { error } = require("console");
const AppError = require("../utils/error");

function encrptPasswod(password, secret) {
  // Implementing pbkdf2Sync
  try {
    const encrypted = crypto.pbkdf2Sync(
      password,
      secret,
      100000,
      100,
      "sha512"
    );

    return encrypted.toString("hex");
  } catch (err) {
    res.status(405).send({
      message: "Error generating password please try again later",
    });
  }
}

exports.handleLogin = async (req, res) => {
  const cookies = req.cookies;
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(403).send({ message: "Invalid user submited" });
    return res;
  }
  let error = {};

  try {
    const userdb = await User.findOne({
      where: { username: req.body.username },
    })
      .then((response) => {
        console.log(response);
        if (!response) {
          res.status(201).send({ message: "INVALID USERNAME TRY AGAIN" });
        }

        if (
          !(
            response.password ==
            encrptPasswod(req.body.password, configs.ENCRYPT_KEY)
          )
        ) {
          throw new AppError(403, "Password Mismatch");
        }
        return response;
      })
      .catch((error) => {
        throw error;
      });

    let refreshToken = "";
    if (!cookies?.jwt) {
      refreshToken = cookies?.jwt;
      const foundRefreshToken = await Token.findOne({
        where: { token: refreshToken },
      })
        .then((response) => {
          console.log(response);
          return response;
        })
        .catch((error) => {
          console.log(error);

          console.log(err);
          res.status(403).json(err.message).end();
        });

      const response = await Token.destroy({
        where: { token: refreshToken },
      });
    }

    const accessToken = jwt.sign(
      {
        payload: {
          username: userdb.username,
          lastname: userdb.lastname,
          userType: userdb.userType,
        },
      },
      configs.JWT_SECRET_KEY,
      { expiresIn: configs.ACCESS_TOKEN_EXPIRES }
    );

    refreshToken = jwt.sign(
      {
        payload: {
          username: userdb.username,
          lastname: userdb.lastname,
          userType: userdb.userType,
        },
      },
      configs.JWT_REFRESH_TOKEN,
      { expiresIn: configs.REFRESH_TOKEN_EXPIRES }
    );

    refreshToken = await Token.create({
      userId: userdb.id,
      token: refreshToken,
    });

    console.log(refreshToken);

    res.cookie("jwt", refreshToken.token, {
      httpOnly: false,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.send({
      access_token: accessToken,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(405).send(err.message);
  }
};

exports.changePassword = function (req, res) {
  var userId = req.params.id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      if (config.env != "demo") {
        User.save(function (err) {
          if (err) return validationError(res, err);
          res.send(200);
        });
      } else {
        res.send(200);
      }
    } else {
      res.send(403);
    }
  });
};

exports.refreshAccessToken = async (req, res) => {
  const access_token = req.params.access_token;

  var payload = {};
  var newTokens = {};
  if (!access_token) {
    res.status(403).send({ message: "Invalid AcessToken submited" });
    return res;
  }

  try {
    jwt.verify(access_token, configs.JWT_SECRET_KEY, function (err, data) {
      if (err) {
        throw new AppError(403, "Invalid AcessToken submited");
      }
      console.log(data);
      payload = data.payload;

      if (data.exp <= Date.now) {
        const cookies = req.cookies;
        if (!cookies.jwt) {
          throw new AppError(403, "Invalid Refresh token submited");
        }

        const refreshToken = cookies.jwt;

        jwt.verify(
          refreshToken,
          configs.JWT_REFRESH_TOKEN,
          async function (err, data) {
            if (err) {
              console.log(err);
              throw new AppError(403, "Invalid refresh token");
            }

            if (data.exp <= Date.now) {
              throw new AppError(403, "Invalid refresh token");
            }
            const foundRefreshToken = await Token.findOne({
              where: { token: refreshToken },
            })
              .then((response) => {
                console.log(response);
                return response;
              })
              .catch((error) => {
                console.log(error);
                throw new AppError(403, "Error getting refresh token");
              });

            payload = data.payload;
            newTokens = generateTokens(payload);
            foundRefreshToken.token = newTokens.refreshAccessToken;
            foundRefreshToken.save();
            res.cookie("jwt", refreshToken.token, {
              httpOnly: false,
              secure: true,
              sameSite: "None",
              maxAge: 7 * 24 * 60 * 60 * 1000,
            });
          }
        );
      }

      newTokens = generateTokens(payload);
      return;
    });

    return res.send({
      access_token: newTokens.accessToken,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(405).send(err.message);
    return res;
  }
};

exports.handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = JSON.parse(cookies.jwt);
  const foundRefreshToken = await Token.findOne({
    where: { token: refreshToken },
  });

  if (!foundRefreshToken) {
    res.clearCookie("jwt");
    return res.sendStatus(204);
  }

  const d_token = await Token.destroy({
    where: { userId: foundRefreshToken.userId },
  });
  //res.status(403).json({ message: "Logout successful" });

  res.clearCookie("jwt");
  return res.sendStatus(204);
};

function generateTokens(payload) {
  const newRefreshToken = jwt.sign(
    {
      payload: {
        username: payload.username,
        lastname: payload.lastname,
        userType: payload.userType,
      },
    },
    configs.JWT_REFRESH_TOKEN,
    { expiresIn: configs.REFRESH_TOKEN_EXPIRES }
  );

  const newAccessToken = jwt.sign(
    {
      payload: {
        username: payload.username,
        lastname: payload.lastname,
        userType: payload.userType,
      },
    },
    configs.JWT_SECRET_KEY,
    { expiresIn: configs.ACCESS_TOKEN_EXPIRES }
  );
  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}
