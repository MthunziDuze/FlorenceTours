module.exports = (app) => {
  const image = require("../controllers/image.controller.js");
  const auth = require("../middleware/auth.middleware.js");

  var router = require("express").Router();
  router.post("/images", auth.isAuthenticated, image.upload);

  router.post("/", auth.isAuthenticated, image.create);

  app.use("/api/images", router);
};
