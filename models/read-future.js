module.exports = function (sequelize, DataTypes) {
  const readFuture = sequelize.define('readFuture', {});
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
  };
  return readFuture;
};
