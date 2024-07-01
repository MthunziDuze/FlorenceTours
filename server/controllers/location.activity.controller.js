const db = require("../models");
const LocationActivity = db.locationactivity;
const Images = db.images;
const configs = require("../configs/app.config");
const Vacations = db.vacation;
const Location = db.location;
const Activity = db.activity;
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  const user = req.headers.user;
  const locationActivity = req.body;

  if (
    !locationActivity.name ||
    !locationActivity.locationId ||
    !locationActivity.activityId ||
    !locationActivity.price
  ) {
    return res
      .status(403)
      .send({ message: "Invalid LocationActivity submited" });
  }

  let locationactivitydb = {};

  if (locationActivity.id) {
    locationactivitydb = await LocationActivity.findOne({
      where: { id: req.body.id },
    });

    locationactivitydb.country = req.body.country;
    locationactivitydb.province = req.body.province;
    locationactivitydb.city = req.body.city;
    locationactivitydb.placename = req.body.placename;
    locationactivitydb
      .save()
      .then((data) => {
        res.json({ statusCode: 201, data: data });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    LocationActivity.create(locationActivity)
      .then((data) => {
        res.json({ statusCode: 201, data: data });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
};

exports.findAll = async (req, res) => {
  const location_activities = await LocationActivity.findAll({
    include: [
      {
        model: Vacations,
        as: "vacations",
        attributes: ["id", "name", "description"],
        through: { attributes: [] },
      },
      {
        model: Location,
        as: "location",
        attributes: ["id", "placename", "city", "province"],
      },
    ],
  })
    .then((locationActiities) => {
      return locationActiities;
    })
    .catch((error) => {
      res.status(403).send({ message: "Error Retrieving LocationServices" });
    });
  res.send(JSON.stringify(location_activities));
};

exports.findByVacationId = async (req, res) => {
  let vacatioId = req.params.id;

  const locationActivities = await db.vacation
    .findAll({
      where: { id: Number.parseInt(vacatioId) },
      // include: [
      //   {
      //     model: "vacation_locationactivity",
      //     attributes: [],
      //   },
      // ],
    })
    .then((locationActiities) => {
      return locationActiities;
    })
    .catch((error) => {
      res.status(403).send({ message: "Error Retrieving LocationServices" });
    });
  res.send(JSON.stringify(locationActivities));
};

exports.findOne = async (req, res) => {
  let locationId = req.params.id;
  const location = await LocationActivity.findAll({
    where: { locationId: locationId },
    include: [
      {
        model: Activity,
        as: "activity",
        attributes: ["id", "name", "description"],
      },
    ],
  })
    .then((locationActivities) => {
      res.status(201).send(locationActivities);
    })
    .catch((error) => {
      res.status(401).send(error);
    });

  if (location === null) {
    res.status(500).send({ message: "location not found" });
  }
  res.send(location);
};
exports.update = (req, res) => {
  const id = req.params.id;
  LocationActivity.update(req.body, {
    id: id,
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "location was updated successfully" });
      } else {
        res.send({
          message: `Cannot update LocationActivity with id=${id}. Maybe LocationActivity was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating LocationActivity with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  if (!req.header.ft_hearder) {
    res.status(500).send({ message: "INVALID REQUEST" });
  }
  const verified = jwt.validateToken(
    req.header.ft_hearder,
    configs.JWT_SECRET_KEY
  );
  if (!verified) {
    res.status(500).send({ message: "INVALID REQUEST" });
  }
  const id = req.params.id;

  LocationActivity.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "LocationActivity was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete LocationActivity  with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete LocationActivity with id=" + id,
      });
    });
};
