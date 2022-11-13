module.exports = (app) => {
  const review = require("../controller/review.controller.js");

  var router = require("express").Router();

  router.post("/", review.create);
  router.get("/", review.findAll);
  router.get("/:id", review.findOne);
  router.put("/:id", review.update);
  router.delete("/:id", review.delete);

  app.use("/api/review", router);
};
