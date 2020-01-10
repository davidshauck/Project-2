module.exports = function(sequelize, DataTypes) {
  let Users = sequelize.define("Users", {
        email: {
            type: DataTypes.STRING,
            primaryKey: true
          },
        pw: DataTypes.STRING,
        team_name: DataTypes.STRING
  });
  return Users;
};