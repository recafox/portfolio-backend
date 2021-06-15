const express = require("express");
const ExpController = require("../controllers/exp.controller");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");

router.post("/", requireLogin, ExpController.addExp);
module.exports = router;
