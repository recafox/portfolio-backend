const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
