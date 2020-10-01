
module.exports = function (sequelize, DataTypes) {
  const Recommendations = sequelize.define('Recommendations', {
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Recommendations;
};
