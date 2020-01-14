// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

let db = require("../models");
let path = require("path");
let sequelize = require("sequelize");
let bcrypt = require('bcrypt');
// number of encryption/decryption rounds
const saltRounds = 10;

// setting our db relations
db.UserGame.belongsTo(db.BcryptUsers, {foreignKey: "email", sourceKey: "email"});
db.BcryptUsers.hasMany(db.UserGame, {foreignKey: "email", sourceKey: "email"});

// Routes
// =============================================================
module.exports = function(app) {

  //register: storing name, email and password and redirecting to home page after signup
  app.post('/api/user/create', function (req, res) {

    db.BcryptUsers.findOne({
      where: {
            email: req.body.emailsignup
              }
    }).then(function (user) {
        if (!user) {
          bcrypt.hash(req.body.passwordsignup, saltRounds, function (err, hash) {
            db.BcryptUsers.create({
              email: req.body.emailsignup,
              name: req.body.usernamesignup,
              password: hash
              }).then(function(data) {
                if (data) {      
                res.redirect('/index');
                }
              });
            });
          } else {
          res.sendFile(path.join(__dirname, "../public/signup.html"));
          }
        });
      });

  //login page: storing and comparing email and password,and redirecting to home page after login
  app.post('/api/user/', function (req, res) {

    db.BcryptUsers.findOne({
         where: { 
           email: req.body.email
                }
    }).then(function (user) {
        if (!user) {
          res.sendFile(path.join(__dirname, "../public/signup.html"));
        } else {
          bcrypt.compare(req.body.password, user.password, function (err, result) {
          if (result == true) {
            console.log("MATCH")
            res.send(user);
            res.sendFile(path.join(__dirname, "../public/game.html"));
          } else {
          console.log("Incorrect passwrod")
          res.send('Incorrect password');
          res.redirect('/index');
          }
        });
      }
    });
  });

  app.get("/api/teamname/", function(req, res) {

    db.BcryptUsers.sequelize.query('SELECT name FROM BcryptUsers WHERE email = ?',
    { replacements: [req.body.email], type: sequelize.QueryTypes.SELECT }

      ).then(function(data) {
        console.log(data);
        res.json(data);
      })

    });

  app.get("/api/results/", function(req, res) {
    db.BcryptUsers.findAll({
      include: [{
          model: db.UserGame,
          where: {
              email: req.query.key
          }
        }
      ]
      }).then(function(results){
        res.json(results);
      });
  });

  // POST route for saving a new post
  app.post("/api/submit", function(req, res) {
    db.UserGame.bulkCreate([
      { 
        isHuman: true,
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
      },
      {
        isHuman: false,
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
      },
    ]).then(function(dbResults) {
      res.json(dbResults);
    });
          
  });

};