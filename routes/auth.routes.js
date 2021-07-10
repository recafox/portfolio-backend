const passport = require("passport");
const express = require("express");
const router = express.Router();

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureFlash: true,
//   }),
//   function (req, res) {
//     res.json({
//       isLogin: true,
//     });
//   }
// );

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send({ succeed: false, message: "authentication failed" });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ succeed: true, message: "login succeeded" });
    });
  })(req, res, next);
});

router.post("/logout", function (req, res) {
  req.logout();
  res.json({
    succeed: true,
    message: "logout succeeded",
  });
});
module.exports = router;
