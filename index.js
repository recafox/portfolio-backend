const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  res.send("hello");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
