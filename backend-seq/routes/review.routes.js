module.exports = (app) => {
  const review = require("../controller/review.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.get("/", review.findAll);

  app.use("/api/review", router);
};
