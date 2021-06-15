const passport = require("passport");
const express = require("express");
const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
  }),
  function (req, res) {
    res.send("login!!!");
    // res.redirect("/");
  }
);
router.get("/logout", function (req, res) {
  req.logout();
  res.send("logout!!");
  // res.redirect("/");
});
module.exports = router;
