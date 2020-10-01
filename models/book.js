
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING /*not sure how to do a link for an image*/
    },
    isbn: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reviewID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  return Book;
};
