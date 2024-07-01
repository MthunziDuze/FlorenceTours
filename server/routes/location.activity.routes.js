module.exports = (app) => {
  const locationActivityController = require("../controllers/location.activity.controller.js");
  const auth = require("../middleware/auth.middleware.js");
  var router = require("express").Router();

  router.post("/", auth.isAuthenticated, locationActivityController.create);

  router.get("/", locationActivityController.findAll);

  router.get("/:id", locationActivityController.findOne);

  router.get("/vacation/:id", locationActivityController.findByVacationId);

  router.put("/:id", auth.isAuthenticated, locationActivityController.update);

  router.delete(
    "/:id",
    auth.isAuthenticated,
    locationActivityController.delete
  );

  app.use("/api/locationactivity", router);
};
