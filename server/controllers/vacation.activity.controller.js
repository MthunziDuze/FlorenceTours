const db = require("../models");
const VacationActivity = db.locationactivity;
const jwt = require("../utils/jwt.util");
const configs = require("../configs/app.config");

exports.create = async (req, res) => {
  if (!req.body.vacationId) {
    res.status(403).send({ message: "Invalid vacation submited" });
    return;
  }

  if (!req.body.name || !req.body.description) {
    return res.status(403).send({ message: "Invalid Location submited" });
  }

  const vacationActivityFound = await Vacation.findOne({
    where: { name: req.body.name },
  });

  const vacationActivity = req.body;

  VacationActivity.create(vacationActivity)
    .then((vacationActivityDb) => {
      vacationActivityDb
        .setActivities(vacationActivity.activities)
        .then((data) => {
          return res.send(data);
        });
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ message: err.message || "vacationActivity cannot be created" });
    });
};

exports.findAll = async (req, res) => {
  const response = await vacationActivityService.findAll();

  const vacationActivities = response;
  const vacationActivitiesa = new Array();
  if (vacationActivities) {
    vacationActivities.forEach((vacationActivity) => {
      vacationActivitiesa.push(vacationActivity);
    });
  }
  res.send(JSON.stringify(vacationActivities));
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
