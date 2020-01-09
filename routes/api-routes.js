// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// ** THIS WORKS
db.UserGame.belongsTo(db.Users, {targetKey:'email', foreignKey:'email'});
db.Users.hasMany(db.UserGame, {targetKey:'email', foreignKey:'email'});
db.ComputerGame.belongsTo(db.Users, {targetKey:'email', foreignKey:'email'});
db.Users.hasMany(db.ComputerGame, {targetKey:'email', foreignKey:'email'});

// Routes
// =============================================================
module.exports = function(app) {

  // ** THIS WORKS WITH THE ABOVE COMMENTS
  app.get("/api/results/", function(req, res) {

    db.Users.findAll({
      include: [
        {
          model: db.UserGame,
          where: {
              email: "dave@dave.com"
          }
        },
        {
          model: db.ComputerGame,
          where: {
              email: "dave@dave.com"
          }
        }
      ]
      }).then(function(results){
        res.json(results);
    });
  });

  // POST route for saving a new post
  app.post("/api/submit", function(req, res) {
    console.log(req.body);
    db.UserGame.create({
        week: req.body.user[0].week,
        teamName: req.body.user[0].teamName,
        email: req.body.user[0].email,
        PlayerID1: req.body.user[0].PlayerID,
        url1: req.body.user[0].url,
        playerName1: req.body.user[0].name,
        PlayerID2: req.body.user[1].PlayerID,
        url2: req.body.user[1].url,
        playerName2: req.body.user[1].name,
        PlayerID3: req.body.user[2].PlayerID,
        url3: req.body.user[2].url,
        playerName3: req.body.user[2].name,
        PlayerID4: req.body.user[3].PlayerID,
        url4: req.body.user[3].url,
        playerName4: req.body.user[3].name,
        PlayerID5: req.body.user[4].PlayerID,
        url5: req.body.user[4].url,
        playerName5: req.body.user[4].name,
        PlayerID6: req.body.user[5].PlayerID,
        url6: req.body.user[5].url,
        playerName6: req.body.user[5].name
    })
        .then(function() {

          db.ComputerGame.create({
            week: req.body.computer[0].week,
            teamName: req.body.computer[0].teamName,
            email: req.body.computer[0].email,
            PlayerID1: req.body.computer[0].PlayerID,
            url1: req.body.computer[0].url,
            playerName1: req.body.computer[0].name,
            PlayerID2: req.body.computer[1].PlayerID,
            url2: req.body.computer[1].url,
            playerName2: req.body.computer[1].name,
            PlayerID3: req.body.computer[2].PlayerID,
            url3: req.body.computer[2].url,
            playerName3: req.body.computer[2].name,
            PlayerID4: req.body.computer[3].PlayerID,
            url4: req.body.computer[3].url,
            playerName4: req.body.computer[3].name,
            PlayerID5: req.body.computer[4].PlayerID,
            url5: req.body.computer[4].url,
            playerName5: req.body.computer[4].name,
            PlayerID6: req.body.computer[5].PlayerID,
            url6: req.body.computer[5].url,
            playerName6: req.body.computer[5].name
        })
            .then(function(dbResults) {
                res.json(dbResults);
            });
        });

       
        
  });

};