module.exports = (app) => {
  const location = require("../controllers/location.controller.js");
  const auth = require("../middleware/auth.middleware.js");
  var router = require("express").Router();

  // Create a new location
  router.post("/", auth.isAuthenticated, location.create);

  // Retrieve all locations
  router.get("/", location.findAll);

  // Retrieve a single location with id
  router.get("/:id", location.findOne);

  // Update a location with id
  router.put("/:id", auth.isAuthenticated, location.update);

  // Delete a location with id
  router.delete("/:id", auth.isAuthenticated, location.delete);

  app.use("/api/location", router);
};
