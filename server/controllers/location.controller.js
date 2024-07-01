const db = require("../models");
const Location = db.location;
const Images = db.images;
const configs = require("../configs/app.config");

const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  const user = req.headers.user;
  let payload = {};

  if (!req.body.placename) {
    return res.status(403).send({ message: "Invalid Location submited" });
  }

  let locationdb = {};

  if (req.body.id) {
    locationdb = await Location.findOne({
      where: { id: req.body.id },
    });

    locationdb.country = req.body.country;
    locationdb.province = req.body.province;
    locationdb.city = req.body.city;
    locationdb.placename = req.body.placename;
    locationdb
      .save()
      .then((data) => {
        res.json({ statusCode: 201, data: data });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    const location = req.body;
    Location.create(location)
      .then((data) => {
        res.json({ statusCode: 201, data: data });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
};

exports.findAll = async (req, res) => {
  const response = await Location.findAll();

  const locations = response;
  const locationsa = new Array();
  if (locations) {
    locations.forEach((location) => {
      locationsa.push(location);
    });
  }
  res.send(JSON.stringify(locations));
};
exports.findOne = async (req, res) => {
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
  const location = await Location.findOne({
    where: { id: req.params.id },
  });

  if (location === null) {
    res.status(500).send({ message: "location not found" });
  }
  res.send(location);
};
exports.update = (req, res) => {
  const id = req.params.id;
  Location.update(req.body, {
    id: id,
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "location was updated successfully" });
      } else {
        res.send({
          message: `Cannot update Location with id=${id}. Maybe Location was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Location with id=" + id,
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

  Location.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Location was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Location  with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Location with id=" + id,
      });
    });
};
