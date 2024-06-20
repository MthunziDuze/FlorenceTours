module.exports = (app) => {
  const customer = require("../controllers/customer.controller.js");
  const auth = require("../middleware/auth.middleware.js");

  var router = require("express").Router();

  // Create a new Customer
  router.post("/", customer.create);

  // Retrieve all Customers
  router.get("/", auth.isAuthenticated, customer.findAll);

  // Retrieve a single Customer with id
  router.get("/:id", auth.isAuthenticated, customer.findOne);

  // Update a Customer with id
  router.put("/:id", customer.update);

  // Delete a Customer with id
  router.delete("/:id", auth.isAuthenticated, customer.delete);

  app.use("/api/customer", router);
};
