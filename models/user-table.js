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
        PlayerID1: DataTypes.INTEGER,
        url1: DataTypes.STRING,
        playerName2: DataTypes.STRING,
        PlayerID2: DataTypes.INTEGER,
        url2: DataTypes.STRING,
        playerName3: DataTypes.STRING,
        PlayerID3: DataTypes.INTEGER,
        url3: DataTypes.STRING,
        playerName4: DataTypes.STRING,
        PlayerID4: DataTypes.INTEGER,
        url4: DataTypes.STRING,
        playerName5: DataTypes.STRING,
        PlayerID5: DataTypes.INTEGER,
        url5: DataTypes.STRING,
        playerName6: DataTypes.STRING,
        PlayerID6: DataTypes.INTEGER,
        url6: DataTypes.STRING
  });
  return UserGame;
};