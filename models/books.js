
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    // Model attibutes are defined here
    isbn: {
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
      type: DataTypes.STRING
    }
  });

  Book.associate = function (models) {
    Book.hasMany(models.Review, {
      onDelete: 'cascade'
    });
    Book.hasMany(models.Recommendation, {
      onDelete: 'cascade'
    });
  };

  return Book;
};
