const mongoose = require("mongoose");
const { Schema } = mongoose;

const SocialLinkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgPath: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = SocialLinkSchema;
