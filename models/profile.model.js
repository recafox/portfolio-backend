// only one profile exists
const mongoose = require("mongoose");
const { Schema } = mongoose;
const SocialLinkSchema = require("./socialLink.model");
const SkillSchema = require("./skill.model");

const ProfileSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    socialLinks: {
      type: [SocialLinkSchema],
      required: false,
    },
    skills: {
      type: [SkillSchema],
      required: false,
    },
  },
  {
    capped: true,
    size: 999999,
    max: 1,
  }
);

const ProfileModel = mongoose.model("Profile", ProfileSchema);
module.exports = ProfileModel;
