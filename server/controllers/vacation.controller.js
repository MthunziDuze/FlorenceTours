const db = require("../models");
const Vacation = db.vacation;
const LocationActivity = db.locationactivity;
const Images = db.images;
const jwt = require("../utils/jwt.util");
const configs = require("../configs/app.config");

exports.create = async (req, res) => {
  if (!req.body.locationActivityId) {
    res.status(403).send({ message: "Invalid vacation submited" });
    return;
  }

  if (!req.body.name || !req.body.description) {
    return res.status(403).send({ message: "Invalid Location submited" });
  }
  let vacation = req.body;
  let vacationdb = {};
  if (vacation.id) {
    try {
      vacationdb = await Vacation.findOne({
        where: { id: req.body.id },
      });

      vacationdb.name = vacation.name;
      vacationdb.description = vacation.description;
      vacationdb.discount = vacation.discount;
      vacationdb.price = vacation.price;
      vacationdb.fromDate = vacation.fromDate;
      vacationdb.toDate = vacation.toDate;
      vacationdb.save();
      res.status(201).json({ status: "success", data: vacation });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ status: "failed", message: "Failed to update Vacation" });
    }
  } else {
    try {
      var idArray = [];
      vacation.locationActivityId.forEach((locId) => {
        idArray.push(locId.id);
      });
      console.log(idArray);

      return Vacation.create(vacation).then(function (newVacation) {
        return LocationActivity.findAll({
          where: { id: idArray },
        }).then(function (locationActivity) {
          return newVacation["addLocation_ activities"](locationActivity).then(
            function (ans) {
              res.status(201).json({ status: "success", data: newVacation });
            }
          );
        });
      });

      vacation.locationActivityId.forEach((laId) => {
        return Vacation.findByPk(vacationdb.id).then((dbVacat) => {
          if (!dbVacat) {
            throw new Error("Error saving vacation");
          }

          return LocationActivity.findByPk(laId.id).then((locationActivity) => {
            if (!locationActivity) {
              throw new Error("LocationActivity does not exists");
            }
            locationActivity.addLocationActivity(dbVacat);
            console.log("Added Location Activity");
            res.status(201).json({ status: "success", data: vacation });
          });
        });
      });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ status: "failed", message: "Vacation already exists" });
    }
  }
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

exports.addLocationActivity = async (req, res) => {
  return db.locationactivity
    .findByPk(req.body.locationactivityId)
    .then((locationactivity) => {
      if (!locationactivity) return "errrr";
      return Vacation.findByPk().then((vacatin) => {
        locationactivity.addVacation(vacatin);
        return locationactivity;
      });
    });
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
