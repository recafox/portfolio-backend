const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    capped: true,
    size: 10240,
    max: 1,
  }
);
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
