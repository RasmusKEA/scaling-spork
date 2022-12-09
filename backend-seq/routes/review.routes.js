const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  const review = require("../controller/review.controller.js");

  var router = require("express").Router();

  router.post(
    "/",
    [authJwt.verifyToken, authJwt.isStaffOrAdmin],
    review.create
  );

  router.get("/", review.findAll);
  router.get("/featured", review.findFeatured);
  router.get("/:id", review.findOne);
  router.put(
    "/:id",
    [authJwt.verifyToken, authJwt.isStaffOrAdmin],
    review.update
  );
  router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isStaffOrAdmin],
    review.delete
  );

  app.use("/api/review", router);
};
