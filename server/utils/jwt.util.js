const jwt = require("jsonwebtoken");

exports.generateToken = (payload, secret, expiresIn) => {
  let token = jwt.sign(payload, secret, { expiresIn: expiresIn });
  return token;
};
exports.validateToken = (access_token, secret) => {
  return jwt.verify(access_token, secret, function (err, res) {
    if (err) return res.json({ statusCode: 403, message: err });
    return res;
  });
};
exports.generateTokens = (payload) => {
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
};
