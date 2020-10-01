module.exports = function (sequelize, DataTypes) {
  const readFuture = sequelize.define('currently_reading', {
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
    }
  });
  readFuture.associate = function (models) {
    readFuture.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    readFuture.belongsTo(models.Book, {
      foreignKey: {
        allowNull: false
      }
    });
    return readFuture;
  };
};
