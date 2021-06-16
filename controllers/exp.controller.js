const ExpModel = require("../models/exp.model");

exports.addExp = async (req, res, next) => {
  try {
    const createdModel = await ExpModel.create(req.body);
    res.status(201).json(createdModel);
  } catch (error) {
    next(error);
  }
};

exports.getExp = async (req, res, next) => {
  try {
    const exps = await ExpModel.find({});
    res.status(200).json(exps);
  } catch (error) {
    next(error);
  }
};

exports.updateExp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const exp = req.body;
    const updatedExp = await ExpModel.findByIdAndUpdate(id, exp, {
      new: true,
      useFindAndModify: false,
    });
    if (updatedExp) {
      res.status(200).json(updatedExp);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteExp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedExp = await ExpModel.findByIdAndDelete(id);
    if (deletedExp) {
      res.status(200).json(deletedExp);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};
