module.exports = (sequelize, Sequelize) => {
  const Images = sequelize.define("images", {
    name: {
      type: Sequelize.STRING,
    },
    vacationId: {
      type: Sequelize.INTEGER,
    },
    imagePath: {
      type: Sequelize.STRING,
    },
  });
  return Images;
};
