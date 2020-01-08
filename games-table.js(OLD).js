module.exports = function(sequelize, DataTypes) {
  let UserGame = sequelize.define("UserGame", {
      gameId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          },
        week: DataTypes.INTEGER,
        teamName: DataTypes.STRING,
        email: DataTypes.STRING,
        playerName1: DataTypes.STRING,
        PlayerId1: DataTypes.INTEGER,
        url1: DataTypes.STRING,
        playerName2: DataTypes.STRING,
        PlayerId2: DataTypes.INTEGER,
        url2: DataTypes.STRING,
        playerName3: DataTypes.STRING,
        PlayerId3: DataTypes.INTEGER,
        url3: DataTypes.STRING,
        playerName4: DataTypes.STRING,
        PlayerId4: DataTypes.INTEGER,
        url4: DataTypes.STRING,
        playerName5: DataTypes.STRING,
        PlayerId5: DataTypes.INTEGER,
        url: DataTypes.STRING,
        playerName6: DataTypes.STRING,
        PlayerId6: DataTypes.INTEGER,
        url6: DataTypes.STRING
  });
  return UserGame;
};




// THIS WORKS
// module.exports = function(sequelize, DataTypes) {
//     var UserGame = sequelize.define("UserGame", {
//         gameId: {
//           type: DataTypes.INTEGER,
//           primaryKey: true,
//           autoIncrement: true,
//           },
//         PlayerId: DataTypes.INTEGER,
//         week: DataTypes.INTEGER,
//         url: DataTypes.STRING,
//         playerName: DataTypes.STRING,
//         teamName: DataTypes.STRING,
//         email: DataTypes.STRING
//     });
//     return UserGame;
//   };


  