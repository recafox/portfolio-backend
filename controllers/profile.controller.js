const ProfileModel = require("../models/profile.model");

exports.createProfile = async (req, res, next) => {
  try {
    const createdModel = await ProfileModel.create(req.body);
    res.status(201).json(createdModel);
  } catch (error) {
    next(error);
  }
};
