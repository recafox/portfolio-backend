const ImageModel = require("../models/image.model");
const sharp = require("sharp");

exports.uploadImage = async (req, res, next) => {
  try {
    // resize image to 150x150
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 150, height: 150 })
      .png()
      .toBuffer();

    const createdModel = await ImageModel.create({
      file: buffer,
    });
    res.status(201).json(createdModel);
  } catch (error) {
    next(error);
  }
};

exports.getImage = async (req, res, next) => {
  try {
    const image = await ImageModel.findById(req.params.id);
    res.set("Content-Type", "image/png");
    res.send(image.file);
  } catch (error) {
    next(error);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const deletedImage = await ImageModel.findByIdAndDelete(req.params.id);
    if (deletedImage) {
      res.status(200).send({
        message: "deleted",
      });
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};
