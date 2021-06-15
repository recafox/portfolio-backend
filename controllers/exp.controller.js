const ExpModel = require("../models/exp.model");

exports.addExp = async (req, res, next) => {
  try {
    const createdModel = await ExpModel.create(req.body);
    res.status(201).json(createdModel);
  } catch (error) {
    next(error);
  }
};
