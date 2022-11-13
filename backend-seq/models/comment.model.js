const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    idUser: {
      type: Sequelize.INTEGER,
    },
    idReview: {
      type: Sequelize.INTEGER,
    },
    userComment: {
      type: Sequelize.STRING,
    },
  });

  return Comment;
};
