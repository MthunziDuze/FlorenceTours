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
