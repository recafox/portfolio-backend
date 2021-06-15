// only one profile exists
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExpSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
});

const ExpModel = mongoose.model("Exp", ExpSchema);
module.exports = ExpModel;
