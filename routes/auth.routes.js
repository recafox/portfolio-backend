const passport = require("passport");
const express = require("express");
const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
  }),
  function (req, res) {
    res.json({
      isLogin: true,
    });
  }
);
router.get("/logout", function (req, res) {
  req.logout();
  res.json({
    isLogin: false,
  });
});
module.exports = router;
