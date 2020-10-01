module.exports = function (sequelize, DataTypes) {
  const Connection = sequelize.define('connection', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    followerID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followeeID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Connection.associate = function (models) {
    Connection.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    return Connection;
  };
};
