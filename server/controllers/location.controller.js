const db = require("../models");
const Location = db.location;
const Images = db.images;
const configs = require("../configs/app.config");
const jwt = require("../utils/jwt.util");

exports.create = async (req, res) => {
  const authToken = req.headers.access_token;
  if (!authToken) {
    return res.status(500).send({ message: "INVALID REQUEST" });
  }
  const verified = jwt.validateToken(authToken, configs.JWT_SECRET_KEY);
  if (!verified) {
    return res.status(500).send({ message: "INVALID REQUEST" });
  }
  if (!req.body.placename) {
    return res.status(403).send({ message: "Invalid Location submited" });
  }

  const locationdb = await Location.findOne({
    where: { placename: req.body.placename },
  });

  const location = {
    country: req.body.country,
    province: req.body.province,
    city: req.body.city,
    placename: req.body.placename,
  };

  if (
    locationdb !== null &&
    (locationdb.country !== req.body.country ||
      locationdb.country !== location.country ||
      locationdb.province !== location.province ||
      locationdb.image !== location.image)
  ) {
    locationdb.city = req.body.city;
    locationdb.country = req.body.country;
    locationdb.province = req.body.province;
    locationdb.image = req.body.image;
    Location.update(location)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "location cannot be created" });
      });
  }

  Location.create(location)
    .then((data) => {
      res.json({ statusCode: 201, data: data });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
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
