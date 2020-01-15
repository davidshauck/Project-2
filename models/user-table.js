module.exports = function(sequelize, DataTypes) {
  let UserGame = sequelize.define("UserGame", {
      gameId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      isHuman: {
        type: DataTypes.BOOLEAN,
        validate: true
      },
      sharedId: {
        type: DataTypes.INTEGER,
        validate: true
      },
      week: { 
        type: DataTypes.INTEGER,
        validate: true
      },
      teamName: {
        type: DataTypes.STRING,
        validate: true
      },
      email: { 
        type: DataTypes.STRING,
        validate: true,
        primaryKey: true
      },
      playerName1: {
        type: DataTypes.STRING,
        validate: true,
      },
      PlayerID1: {
        type: DataTypes.INTEGER,
        validate: true
      },
      url1: {
        type: DataTypes.STRING,
        validate: true
      },
      playerName2: {
        type: DataTypes.STRING,
        validate: true
      },
      PlayerID2: {
        type: DataTypes.INTEGER,
        validate: true
      },
      url2: {
        type: DataTypes.STRING,
        validate: true
      },
      playerName3: {
        type: DataTypes.STRING,
        validate: true
      },
      PlayerID3: {
        type: DataTypes.INTEGER,
        validate: true
      },
      url3: {
        type: DataTypes.STRING,
        validate: true
      },
      playerName4: {
        type: DataTypes.STRING,
        validate: true
      },
      PlayerID4: {
        type: DataTypes.INTEGER,
        validate: true
      },
      url4: {
        type: DataTypes.STRING,
        validate: true
      },
      playerName5: {
        type: DataTypes.STRING,
        validate: true
      },
      PlayerID5: {
        type: DataTypes.INTEGER,
        validate: true
      },
      url5: {
        type: DataTypes.STRING,
        validate: true
      },
      playerName6: {
        type: DataTypes.STRING,
        validate: true
      },
      PlayerID6: {
        type: DataTypes.INTEGER,
        validate: true
      },
      url6: {
        type: DataTypes.STRING,
        validate: true
      },
  });
  return UserGame;
};