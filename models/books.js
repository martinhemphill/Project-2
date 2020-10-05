
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    // Model attributes are defined here
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT
    },
    description: {
      type: DataTypes.TEXT
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
