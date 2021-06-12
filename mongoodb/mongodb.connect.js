const mongoose = require("mongoose");
const keys = require("../config/keys");

async function connect() {
  try {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
    console.error("Error connecting to mongodb");
  }
}

module.exports = { connect };
