const express = require("express");
const app = express();

const mongodb = require("./mongoodb/mongodb.connect");
mongodb.connect();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("hello");
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
