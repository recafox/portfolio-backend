const express = require("express");
const app = express();
const profileRoutes = require("./routes/profile.routes");
const imageRoutes = require("./routes/image.routes");
const mongodb = require("./mongoodb/mongodb.connect");
mongodb.connect();

app.use(express.json());

app.use("/profile", profileRoutes);
app.use("/image", imageRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.get("/", (req, res) => {
  res.send("hello!!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
module.exports = app;
