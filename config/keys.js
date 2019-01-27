if (process.env.NODE_ENV === "production") {
  // Return the production keys
  module.exports = require("./prod");
} else {
  // Return development keys, located on local machine
  modules.exports = require("./dev");
}
