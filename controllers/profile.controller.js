/**
 * Profile collection裡只會有一筆紀錄, 也只須要維護這一筆, 若是該紀錄尚未被創造, 就新增一筆
 */
const ProfileModel = require("../models/profile.model");

exports.createProfile = async (req, res, next) => {
  try {
    const createdModel = await ProfileModel.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      useFindAndModify: false,
    });
    res.status(201).json(createdModel);
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const document = await ProfileModel.find({}).exec();
    if (Array.isArray(document) && document.length === 0) {
      res.status(204).send();
    } else {
      res.status(200).json(document);
    }
  } catch (error) {
    next(error);
  }
};
