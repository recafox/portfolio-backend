const express = require("express");
const profileController = require("../controllers/profile.controller");
const router = express.Router();

router.post("/", profileController.createProfile);
router.get("/", profileController.getProfile);
module.exports = router;
