const db = require("../models");
const Review = db.review;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Review.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
