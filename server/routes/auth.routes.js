module.exports = (app) => {
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  router.post("/", auth.handleLogin);

  router.post("/logout", auth.handleLogout);

  router.post("/refresh/:access_token", auth.refreshAccessToken);

  //router.delete("/:id", auth.delete);

  app.use("/api/auth", router);
};
