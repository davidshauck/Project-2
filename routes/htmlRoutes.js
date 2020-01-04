// ===============================================================================
// DEPENDENCIES
// Path package to get the correct file path for our html
// ===============================================================================
let path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Code handles when users "visit" a page.
  //Here, user is shown an HTML page of content / the results or the index pages to pick players
  // ---------------------------------------------------------------------------

  app.get("/results", function(req, res) {
    res.sendFile(path.join(__dirname, "./results.html"));
  });

  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
  });

  // If no matching route is found default to home page, here header
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./header.html"));
  });
};
