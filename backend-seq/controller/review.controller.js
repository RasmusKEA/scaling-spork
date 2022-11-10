const db = require("../models");
const Review = db.review;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Review
  const review = {
    title: req.body.title,
    review: req.body.review,
    date: req.body.date,
    platform: req.body.platform,
    rating: req.body.rating,
    image: req.body.image,
    ratingReasoning: req.body.ratingReasoning,
    idUser: req.body.idUser,
  };

  // Save Review in the database
  Review.create(review)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Review.",
      });
    });
};

exports.findAll = (req, res) => {
  Review.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving reviews.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Review.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Review with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Review with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Review.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Review was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Review with id=${id}. Maybe Review was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Review with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Review.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Review was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Review with id=${id}. Maybe Review was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Review with id=" + id,
      });
    });
};
