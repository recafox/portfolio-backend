const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  file: {
    type: Buffer,
  },
});

const ImageModel = mongoose.model("Image", ImageSchema);
module.exports = ImageModel;
