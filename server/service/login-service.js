require("dotenv").config();
const userController = require("../controllers/user.controller");
const jwt = require("jsonwebtoken");
const configs = require("../configs/app.config");

exports.loginUser = async (access_token) => {
  const googleUserinfoUrl = `${process.env.GOOGLE_PROFILE_URL}?access_token=${access_token}`;

  console.log("GoogleProfile url: ", googleUserinfoUrl);

  const response = await fetch(googleUserinfoUrl, {
    method: "Get",
    headers: {
      "Content-Type": "applications/json",
      Autherization: `Brearer ${access_token}`,
      AccessControlAllowOrigin: "*",
    },
  });
  return handleResponse(response);
};

exports.signupUser = async (req, res) => {
  return userController.createUser;
};
function handleResponse(response) {
  if (response.status == 200 || response.status == 201) {
    return response.json();
  }
  const errorMessage = response.text();
  throw new Error(errorMessage);
}

exports.generateAccessToken = (user) => {
  let token = jwt.sign(
    {
      firstname: user.firstname,
      lastname: user.lastname,
      userType: user.userType,
    },
    configs.JWT_SECRET_KEY,
    { expiresIn: 600 }
  );
  return token;
};
exports.validateAccessToken = (access_token) => {
  const verified = jwt.verify(access_token, configs.JWT_SECRET_KEY);
  return verified;
};
