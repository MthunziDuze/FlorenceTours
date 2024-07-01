const configs = require("../configs/app.config");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userService = require("../service/login-service");
const db = require("../models");
const User = db.user;

exports.create = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(403).send({ message: "Invalid user submited" });
    return;
  }
  const user = req.body;

  try {
    const data = userService.signupUser(user);
    return res.statusCode(201).json(data);
  } catch (error) {
    return res.error;
  }
};

exports.confirmEmail = async (req, res) => {
  const access_token = req.params.accessToken;
  if (!access_token) {
    res.status(403).send({ message: "Invalid token submited" });
    return;
  }
  //const access_token = req.params.accessToken;

  var payload = jwt.verify(
    req.body.accessToken,
    configs.MAIL_CONFIRMATION_TOKEN
  );
  const user = payload;

  if (!user) return res.json(501, "Unauthorized!");
  User.create(user)
    .then((data) => {
      res.send(data);
      return;
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "user cannot be created" });
      return;
    });
};

function validatePassword(password, dbPasswod) {
  crypto.verify();
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

exports.findAll = (req, res) => {
  User.find;
};
exports.findOne = async (req, res) => {
  const user = await User.findOne({
    where: { username: req.params.username },
  });

  if (user === null) {
    res.status(500).send({ message: "user not found" });
  }
  res.send(user);
};
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    id: id,
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "User was updated successfully" });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User  with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Tutorial with id=${id}.`,
      });
    });
};
