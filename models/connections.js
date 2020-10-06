module.exports = function (sequelize, DataTypes) {
  const Connection = sequelize.define('Connection', {
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   allowNull: true,
    //   primaryKey: true
    // },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followeeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Connection.removeAttribute('id');
  // Connection.associate = function (models) {
  //   Connection.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };
  return Connection;
};
