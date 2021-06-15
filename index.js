const express = require("express");
const cookieSession = require("cookie-session");
const flash = require("connect-flash");
const passport = require("passport");
const app = express();
const profileRoutes = require("./routes/profile.routes");
const imageRoutes = require("./routes/image.routes");
const authRouters = require("./routes/auth.routes");
const mongodb = require("./mongoodb/mongodb.connect");
mongodb.connect();

require("./service/passport");

app.use(flash());
app.use(
  cookieSession({
    // milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // encript cookie name by using this key
    keys: ["odksuwkfmavkisj"],
  })
);

// tell passport to use cookie
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/profile", profileRoutes);
app.use("/image", imageRoutes);
app.use("/auth", authRouters);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.get("/", (req, res) => {
  res.send("hello!!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
// module.exports = app;
