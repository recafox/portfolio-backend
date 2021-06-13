const express = require("express");
const app = express();
const profileRoutes = require("./routes/profile.routes");
const mongodb = require("./mongoodb/mongodb.connect");
mongodb.connect();

app.use(express.json());

app.use("/profile", profileRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = app;
