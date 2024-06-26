const dbConfig = require("../configs/db.config.js");
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.DB_USER,
  dbConfig.DB_PASSWORD,
  {
    host: dbConfig.DB_HOST,
    port: dbConfig.DB_PORT,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.tokens = require("./user.tokens.js")(sequelize, Sequelize);
db.customer = require("./customer.model.js")(sequelize, Sequelize);
db.offer = require("./offer.model.js")(sequelize, Sequelize);
db.images = require("./images.model.js")(sequelize, Sequelize);
db.location = require("./location.model.js")(sequelize, Sequelize);
db.activity = require("./activity.model.js")(sequelize, Sequelize);
db.vacation = require("./vacation.model.js")(sequelize, Sequelize);
db.locationactivity = require("./location.activity.model.js")(
  sequelize,
  Sequelize
);

db.user.hasMany(db.tokens, { as: "refreshTokens" });
db.tokens.belongsTo(db.user, { foreignKey: "userId" });

db.customer.hasMany(db.offer, { as: "offers" });
db.offer.belongsTo(db.customer, { foreignKey: "customerId", as: "customer" });

db.vacation.hasMany(db.images, { as: "images" });
db.images.belongsTo(db.vacation, { foreignKey: "vacationId" });

db.vacation.belongsToMany(db.locationactivity, {
  through: "vacation_locationActivity",
  as: "location_ activities",
  foreignKey: "vacationId",
});

db.locationactivity.belongsToMany(db.vacation, {
  through: "vacation_locationActivity",
  as: "vacations",
  foreignKey: "locationActivityId",
});

db.locationactivity.belongsTo(db.location, { foreignKey: "locationId" });
db.location.hasMany(db.locationactivity, { as: "location_activities" });

db.vacation.hasMany(db.offer, { as: "offers" });
db.offer.belongsTo(db.vacation, { foreignKey: "vacationId" });

db.activity.hasMany(db.locationactivity, { as: "location_activities" });
db.locationactivity.belongsTo(db.activity, { foreignKey: "activityId" });

module.exports = db;
