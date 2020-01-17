module.exports = function(sequelize, DataTypes) {
  let UserGames = sequelize.define("UserGames", {
      gameId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      isHuman: {
        type: DataTypes.BOOLEAN,
        validate: true
      },
      win: { 
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
      PlayerPoints1: {
        type: DataTypes.DECIMAL(5,2),
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
      PlayerPoints2: {
        type: DataTypes.DECIMAL(5,2),
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
      PlayerPoints3: {
        type: DataTypes.DECIMAL(5,2),
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
      PlayerPoints4: {
        type: DataTypes.DECIMAL(5,2),
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
      PlayerPoints5: {
        type: DataTypes.DECIMAL(5,2),
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
      PlayerPoints6: {
        type: DataTypes.DECIMAL(5,2),
        validate: true
      }
  });
  return UserGames;
};