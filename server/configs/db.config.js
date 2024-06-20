require("dotenv/config");
module.exports = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB,
  dialect: "mysql",
  pool: {
    max: 6,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
