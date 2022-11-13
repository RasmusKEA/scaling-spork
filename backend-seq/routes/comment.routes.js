module.exports = (app) => {
  const comment = require("../controller/comment.controller.js");

  var router = require("express").Router();

  router.post("/", comment.create);
  router.get("/all", comment.findAllByReview);
  router.get("/:id", comment.findOne);
  router.put("/:id", comment.update);
  router.delete("/:id", comment.delete);

  app.use("/api/comment", router);
};
