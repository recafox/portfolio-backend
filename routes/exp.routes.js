const express = require("express");
const ExpController = require("../controllers/exp.controller");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");

router.post("/", requireLogin, ExpController.addExp);
router.get("/", ExpController.getExp);
router.put("/:id", requireLogin, ExpController.updateExp);
router.delete("/:id", requireLogin, ExpController.deleteExp);
module.exports = router;
