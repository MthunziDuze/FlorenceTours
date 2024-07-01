require("dotenv").config();
const userController = require("../controllers/user.controller");
const jwt = require("jsonwebtoken");
const db = require("../models");
const UserDao = db.user;
const configs = require("../configs/app.config");
const emailService = require("../service/email-service");
const crypto = require("crypto");

exports.loginUser = async (access_token) => {
  const googleUserinfoUrl = `${process.env.GOOGLE_PROFILE_URL}?access_token=${access_token}`;

  console.log("GoogleProfile url: ", googleUserinfoUrl);

  const response = await fetch(googleUserinfoUrl, {
    method: "Get",
    headers: {
      "Content-Type": "applications/json",
      Autherization: `Bearer ${access_token}`,
      AccessControlAllowOrigin: "*",
    },
  });
  return handleResponse(response);
};

exports.signupUser = async (user) => {
  const userdb = await UserDao.findOne({
    where: { username: user.username },
  });

  if (userdb !== null) {
    res.status(201).send({ message: "USER ALREADY EXISTS, LOGIN" });
    return;
  }
  user.password = encrptPasswod(user.password, configs.ENCRYPT_KEY);
  user.userType = "USER";

  var confirmationToken = jwt.sign(user, configs.MAIL_CONFIRMATION_TOKEN, {
    expiresIn: 6000 + Date.now(),
  });
  console.log(
    "confirmation Token: " +
      configs.BACKEND_ENDPOINT +
      configs.CONFIRMATION_URL +
      confirmationToken
  );

  var guestAccessToken = jwt.sign(
    {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    },
    configs.MAIL_CONFIRMATION_TOKEN,
    { expiresIn: 180000 + Date.now() }
  );

  var locals = {
    COMPANY: "FlorenceTours",
    CONFIRMATION_URL: configs.BACKEND_ENDPOINT + configs.CONFIRMATION_URL,
    MAIL_CONFIRMATION_TOKEN: confirmationToken,
    name: user.firstname + " " + user.lastname,
  };

  emailService.sendEmail(
    "verifyEmail",
    locals,
    user,
    "Verify account",
    function (err, res) {
      if (err) throw err;
      console.log(res);
      return { token: guestAccessToken };
    }
  );
  return userController.createUser;
};

exports.resetPassword = async (user) => {
  const userdb = await UserDao.findOne({
    where: { username: user.username },
  }).then((user) => {
    if (!user) throw handleResponse(Error("User not found"));
    jwt.sign(
      {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      configs.MAIL_CONFIRMATION_TOKEN,
      { expiresIn: 240000 + Date.now() }
    );
  });
  var locals = {
    COMPANY: "FlorenceTours",
    CONFIRMATION_URL: configs.BACKEND_ENDPOINT + configs.CONFIRMATION_URL,
    MAIL_CONFIRMATION_TOKEN: confirmationToken,
    name: user.firstname + " " + user.lastname,
  };

  emailService.sendEmail(
    "verifyEmail",
    locals,
    user,
    "Verify account",
    function (err, res) {
      if (err) throw err;
      console.log(res);
      return { token: guestAccessToken };
    }
  );
};

function handleResponse(response) {
  if (response.status == 200 || response.status == 201) {
    return response.json();
  }
  const errorMessage = response.text();
  throw new Error(errorMessage);
}

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
