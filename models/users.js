module.exports = function(sequelize, DataTypes) {
  let Usersxx = sequelize.define("Usersxxx", {
        email: {
            type: DataTypes.STRING,
            primaryKey: true
          },
        pw: DataTypes.STRING,
        team_name: DataTypes.STRING
  });
  return Usersxx;
};