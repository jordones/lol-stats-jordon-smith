const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Enable request body JSON parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a sample root route
app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

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
