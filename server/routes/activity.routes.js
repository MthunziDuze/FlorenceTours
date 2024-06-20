module.exports = (app) => {
  const activity = require("../controllers/activity.controller.js");
  const auth = require("../middleware/auth.middleware.js");

  var router = require("express").Router();

  // Create a new acivity
  router.post("/", auth.isAuthenticated, activity.create);

  // Retrieve all activity
  router.get("/", activity.findAll);

  // Retrieve a single activity with id
  router.get("/:id", activity.findOne);

  // Update a activity with id
  router.put("/:id", auth.isAuthenticated, activity.update);

  // Delete a activity with id
  router.delete("/:id", auth.isAuthenticated, activity.delete);

  app.use("/api/activity", router);
};
