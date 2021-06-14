const express = require("express");
const profileController = require("../controllers/profile.controller");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");

router.post("/", requireLogin, profileController.createProfile);
router.get("/", profileController.getProfile);
module.exports = router;
