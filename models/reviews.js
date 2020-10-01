module.exports = function (sequelize, DataTypes) {
  const Reviews = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    comments: {
      type: DataTypes.TEXT
    }
  });

  Review.associate = function (models) {

    Review.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Review.belongsTo(models.Book, {
      foreignKey: {
        allowNull: false
      }
    });

  return Reviews;
};
