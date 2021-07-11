const express = require("express");
const multer = require("multer");
const requireLogin = require("../middlewares/requireLogin");

const upload = multer({
  limit: {
    // 限制上傳檔案的大小為 1MB
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("image format is not valid"));
    }
    cb(null, true);
  },
});
const imageController = require("../controllers/image.controller");
const router = express.Router();

router.post(
  "/",
  requireLogin,
  upload.single("image"),
  imageController.uploadImage
);
router.get("/:id", imageController.getImage);
router.delete("/:id", requireLogin, imageController.deleteImage);
module.exports = router;
