const DemoModel = require("../models/demo.model");

exports.createDemo = async (req, res, next) => {
  try {
    const createdDemo = await DemoModel.create(req.body);
    res.status(201).json(createdDemo);
  } catch (error) {
    next(error);
  }
};

exports.updateDemo = async (req, res, next) => {
  try {
    const updatedDemo = await DemoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        useFindAndModify: false,
      }
    );
    if (updatedDemo) {
      res.status(200).json(updatedDemo);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.getDemo = async (req, res, next) => {
  try {
    const demos = await DemoModel.find({});
    res.status(200).json(demos);
  } catch (error) {
    next(error);
  }
};

exports.deleteDemo = async (req, res, next) => {
  try {
    const deletedDemo = await DemoModel.findByIdAndDelete(req.params.id);
    if (deletedDemo) {
      res.status(200).json(deletedDemo);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};
