module.exports = function (sequelize, DataTypes) {
  const readPast = sequelize.define('already_completed', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    isbn: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reviewID: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  readPast.associate = function (models) {
    readPast.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    readPast.belongsTo(models.Book, {
      foreignKey: {
        allowNull: false
      }
    });
    return readPast;
  };
};
