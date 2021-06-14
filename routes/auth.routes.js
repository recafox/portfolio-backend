const passport = require("passport");

module.exports = (app) => {
  app.post(
    "/auth/login",
    passport.authenticate("local", {
      successRedirect: "/backend",
      failureRedirect: "/",
    })
  );
};
