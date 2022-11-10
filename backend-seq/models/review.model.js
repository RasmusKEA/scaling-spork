const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define("review", {
    review: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.INTEGER,
    },
    ratingReasoning: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATEONLY,
    },
    platform: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    featured: {
      type: Sequelize.TINYINT,
    },
  });

  return Review;
};
