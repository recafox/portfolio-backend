const mongoose = require("mongoose");
const { Schema } = mongoose;

const SocialLinkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imgPath: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = SocialLinkSchema;
