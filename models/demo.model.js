// only one profile exists
const mongoose = require("mongoose");
const { Schema } = mongoose;

const DemoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
    required: false,
  },
  demoLink: {
    type: String,
    required: true,
  },
  imgPath: {
    type: String,
    required: false,
  },
  tags: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const DemoModel = mongoose.model("Demo", DemoSchema);
module.exports = DemoModel;
