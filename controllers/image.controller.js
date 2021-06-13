const ImageModel = require("../models/image.model");

exports.uploadImage = async (req, res, next) => {
  try {
    const createdModel = await ImageModel.create({
      file: req.file.buffer,
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
