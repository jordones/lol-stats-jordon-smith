const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const Champion = require("./classes/Champion");
const Rune = require("./classes/Rune");
const Spell = require("./classes/Spell");
const Item = require("./classes/Item");

// Enable request body JSON parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a sample root route
app.get("/api/matches", (req, res) => {
  res.send({ hello: "world" });
});

// Serve static content to be accessed by /img/path/to/file
app.use(express.static("public"));

// Production Setup to serve React front end when deployed to heroku
if (process.env.NODE_ENV === "production") {
  // Serve React build statically
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, catch all to return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// dynamic port binding for heroku
// read port from environment variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);
