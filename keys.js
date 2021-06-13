// figure out what set of credentials to return
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod.key");
} else {
  module.exports = require("./dev.key");
}
