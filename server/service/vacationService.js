const db = require("../models");
const Vacation = db.vacation;
const LocationActivity = db.locationactivity;
const Images = db.images;
const jwt = require("../utils/jwt.util");
const configs = require("../configs/app.config");
const { handleResponse } = require("./payFastService");

exports.create = async (vacation) => {
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
            handleResponse(ans);
          }
        );
      });
    });
  } catch (err) {
    handleResponse(err);
  }
};

exports.updateVacation = async (vacation, vacationId) => {
  try {
    await Vacation.findOne({
      where: { id: vacationId },
    }).then(function (vacationdb) {
      vacationdb.name = vacation.name;
      vacationdb.description = vacation.description;
      vacationdb.discount = vacation.discount;
      vacationdb.price = vacation.price;
      vacationdb.fromDate = vacation.fromDate;
      vacationdb.toDate = vacation.toDate;
      vacationdb.save();
      handleResponse(vacationdb);
    });
  } catch (err) {
    handleResponse(err);
  }
};

exports.findAll = async () => {
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
  return JSON.stringify(vacations);
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
