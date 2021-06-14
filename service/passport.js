const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user.model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // use id to find user in mongodb, and make a model instance of it
  UserModel.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(async function (username, password, cb) {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return cb(null, false, { message: "no user found" });
    }
    if (user.password !== password) {
      return cb(null, false);
    }
    return cb(null, user);
  })
);
