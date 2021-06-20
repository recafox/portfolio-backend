const express = require("express");
const DemoController = require("../controllers/demo.controller");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");

router.post("/", requireLogin, DemoController.createDemo);
router.put("/:id", requireLogin, DemoController.updateDemo);
router.get("/", DemoController.getDemo);
router.delete("/:id", requireLogin, DemoController.deleteDemo);
module.exports = router;
