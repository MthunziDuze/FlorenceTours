const db = require("../models");
const Token = db.refreshToken;
const configs = require("../configs/app.config");
const jwt = require("../utils/jwt.util");
const crypto = require("crypto");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { httpOnly, sameSite: "None", secure: true });

  if (!req.body.username || !req.body.password) {
    res.status(403).send({ message: "Invalid user submited" });
    return;
  }

  const tokendb = await User.findOne({
    where: { token: refreshToken },
  });

  if (!tokendb) {
    jwt.validateToken(refreshToken, configs.REFRESH_TOKEN_SECRET),
      async (err, decoded) => {
        if (err) return res.status(403).send({ message: "FORBIDDEN" });
        const hackedUser = await User.findOne({
          where: { username: decoded.username },
        });
        hackedUser.refreshToken = [];
        const result = await User.update(hackedUser);
        console.log(result);
      };
    res.status(403).send({ message: "FORBIDDEN" });
    return;
  }

  const newRefreshTokenArray = userdb.refreshToken.filter(
    (rt) => rt != refreshToken
  );

  jwt.validateToken(
    refreshToken,
    configs.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        userdb.refreshToken = [...newRefreshTokenArray];
        const result = await User.update(userdb);
        console.log(result);
      }
      if (err || userdb.username !== decoded.username) {
        return res.sendStatus(403);
      }

      const accessToken = jwt.generateToken(
        {
          paload: {
            username: userdb.username,
            lastname: userdb.lastname,
            userType: userdb.userType,
          },
        },
        configs.JWT_SECRET_KEY,
        60000
      );

      const newRefreshToken = jwt.generateToken(
        {
          paload: {
            username: userdb.username,
            lastname: userdb.lastname,
            userType: userdb.userType,
          },
        },
        configs.REFRESH_TOKEN_SECRET,
        "7d"
      );
      userdb.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await User.update(userdb);
      console.log(result);

      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: "7d",
      });
    }
  );
};

export function get(req, res) {}

export function remove(req, res) {}
