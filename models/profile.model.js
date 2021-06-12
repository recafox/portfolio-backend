const mongoose = require("mongoose");
const { Schema } = mongoose;
const SocialLinkSchema = require("./socialLink.model");

const ProfileSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  socialLinks: [SocialLinkSchema],
});

const ProfileModel = mongoose.model("Profile", ProfileSchema);
module.exports = ProfileModel;
