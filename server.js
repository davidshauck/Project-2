// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");

// Sets up the Express App
// =============================================================
let app = express();
let PORT = process.env.PORT || 8080;

// Requiring our models for syncing
let db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================

if (process.env.JAWSDB_URL) {
  console.log("There is a JAWS DB URL")
  seq = new Sequelize(process.env.JAWSDB_URL)
}
else {
  seq = require("./models").sequelize
}
seq.sync().then(() => {
app.listen(PORT, () => console.log('server started on port ' + PORT));
});

// db.sequelize.sync().then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });