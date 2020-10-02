module.exports = function (sequelize, DataTypes) {
  const readPast = sequelize.define('readPast', {});
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
  };
  return readPast;
};
