const db = require("../models");
const Vacation = db.vacation;
const Images = db.images;
const Token = db.tokens;
const jwt = require("../utils/jwt.util");
const configs = require("../configs/app.config");

exports.create = async (req, res) => {
  const authToken = req.headers.access_token;
  if (!authToken) {
    return res.status(500).send({ message: "INVALID REQUEST" });
  }
  const verified = jwt.validateToken(authToken, configs.JWT_SECRET_KEY);
  if (!verified) {
    return res.status(500).send({ message: "INVALID REQUEST" });
  }

  if (!req.body.locationId) {
    res.status(403).send({ message: "Invalid vacation submited" });
    return;
  }

  if (!req.body.name || !req.body.description) {
    return res.status(403).send({ message: "Invalid Location submited" });
  }

  const vacationdb = await Vacation.findOne({
    where: { name: req.body.name },
  });

  const vacation = req.body;

  Vacation.create(vacation)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ message: err.message || "Location cannot be created" });
    });
};

exports.findAll = async (req, res) => {
  const response = await Vacation.findAll({
    include: [{ model: Images, as: "images" }],
  });

  const vacations = response;
  const vacationsa = new Array();
  if (vacations) {
    vacations.forEach((vacation) => {
      vacationsa.push(vacation);
    });
  }
  res.send(JSON.stringify(vacations));
};

exports.findOne = async (req, res) => {
  if (!req.header.ft_hearder) {
    res.status(500).send({ message: "INVALID REQUEST" });
  }
  const vacation = await Vacation.findOne({
    where: { id: req.params.id },
  });

  if (vacation === null) {
    res.status(500).send({ message: "vacation not found" });
  }
  res.send(user);
};
exports.update = (req, res) => {
  if (!req.header.ft_hearder) {
    res.status(500).send({ message: "INVALID REQUEST" });
  }
  const id = req.params.id;
  Vacation.update(req.body, {
    id: id,
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Vacation was updated successfully" });
      } else {
        res.send({
          message: `Cannot update Vacation with id=${id}. Maybe Vacation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Vacation with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  if (!req.header.ft_hearder) {
    res.status(500).send({ message: "INVALID REQUEST" });
  }
  const id = req.params.id;

  Vacation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vacation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Vacation  with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Vacation with id=" + id,
      });
    });
};
