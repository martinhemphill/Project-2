module.exports = function (sequelize, DataTypes) {
  const readCurrent = sequelize.define('readCurrent', {
  });
  readCurrent.associate = function (models) {
    readCurrent.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    readCurrent.belongsTo(models.Book, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return readCurrent;
};
