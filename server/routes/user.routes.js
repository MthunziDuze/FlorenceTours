module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const auth = require("../middleware/auth.middleware.js");
  var router = require("express").Router();

  router.post("/", user.create);

  router.get("/", auth.isAuthenticated, user.findAll);

  router.post("/confirm-email/:accessToken", user.confirmEmail);

  router.get("/:id", user.findOne);

  router.put("/:id", user.update);

  router.delete("/:id", auth.isAuthenticated, user.delete);

  app.use("/api/user", router);
};
