module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define("activity", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Activity;
};
