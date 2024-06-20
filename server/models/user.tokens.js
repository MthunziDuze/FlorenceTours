module.exports = (sequelize, Sequelize) => {
  const RefreshToken = sequelize.define("refreshToken", {
    userId: {
      type: Sequelize.INTEGER,
    },
    token: {
      type: Sequelize.STRING,
    },
  });
  return RefreshToken;
};
