
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    // Model attributes are defined here
    // bookId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true
    // },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Book.associate = function (models) {
    Book.hasMany(models.Review, {
      onDelete: 'cascade'
    });
    Book.hasMany(models.Recommendation, {
      onDelete: 'cascade'
    });
    Book.hasMany(models.readPast, {
      onDelete: 'cascade'
    });
    Book.hasMany(models.readCurrent, {
      onDelete: 'cascade'
    });
    Book.hasMany(models.readFuture, {
      onDelete: 'cascade'
    });
  };

  return Book;
};
