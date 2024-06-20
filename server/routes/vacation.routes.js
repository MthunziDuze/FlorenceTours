module.exports = (app) => {
  const vacation = require("../controllers/vacation.controller.js");
  const auth = require("../middleware/auth.middleware.js");

  var router = require("express").Router();

  // Create a new vacation
  router.post("/", auth.isAuthenticated, vacation.create);

  // Retrieve all vacations
  router.get("/", vacation.findAll);

  // Retrieve a single vacation with id
  router.get("/:id", vacation.findOne);

  // Update a Vacation with id
  router.put("/:id", auth.isAuthenticated, vacation.update);

  // Delete a vacation with id
  router.delete("/:id", auth.isAuthenticated, vacation.delete);

  app.use("/api/vacation", router);
};
