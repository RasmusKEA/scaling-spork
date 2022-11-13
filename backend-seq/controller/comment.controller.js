const db = require("../models");
const Comment = db.comment;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.userComment) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Comment
  const comment = {
    idUser: req.body.idUser,
    idReview: req.body.idReview,
    userComment: req.body.userComment,
  };

  // Save Comment in the database
  Comment.create(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the comment.",
      });
    });
};

//Request: http://localhost:3000/api/comment/all?idReview=7
exports.findAllByReview = (req, res) => {
  const idReview = req.query.idReview;
  var condition = idReview
    ? { idReview: { [Op.like]: `%${idReview}%` } }
    : null;

  Comment.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Comment with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Comment with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Comment.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Comment with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id,
      });
    });
};
