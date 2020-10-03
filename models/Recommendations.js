
module.exports = function (sequelize, DataTypes) {
  const Recommendation = sequelize.define('Recommendation', {});
  Recommendation.associate = function (models) {
    Recommendation.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Recommendation.belongsTo(models.Book, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Recommendation;
};
