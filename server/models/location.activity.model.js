module.exports = (sequelize, Sequelize) => {
  const LocationActivity = sequelize.define("location_activity", {
    price: {
      type: Sequelize.STRING,
    },
    ageRestriction: {
      type: Sequelize.DOUBLE,
    },
    description: {
      type: Sequelize.STRING,
    },
    startDate: {
      type: Sequelize.DATE,
    },
    endDate: {
      type: Sequelize.DATE,
    },
    locationId: {
      type: Sequelize.INTEGER,
    },
    activityId: {
      type: Sequelize.INTEGER,
    },
  });
  return LocationActivity;
};
