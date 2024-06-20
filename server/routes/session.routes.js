module.exports = (app) => {
  const session = require("../controllers/refresh.token.controller.js");
  var router = require("express").Router();

  router.post("/create", session.create);
  router.get("/get", user.getSessionHandler);
  router.delete("/delete", sessionId);

  app.use("/api/session", router);
};
