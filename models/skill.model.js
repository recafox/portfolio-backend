const mongoose = require("mongoose");
const { Schema } = mongoose;

const SkillSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  imgPath: {
    type: String,
    required: false,
  },
});

module.exports = SkillSchema;
