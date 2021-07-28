const express = require("express");
const cookieSession = require("cookie-session");
const flash = require("connect-flash");
const keys = require("./keys");
const passport = require("passport");
const app = express();
const mongodb = require("./mongoodb/mongodb.connect");
mongodb.connect();
const profileRoutes = require("./routes/profile.routes");
const imageRoutes = require("./routes/image.routes");
const authRoutes = require("./routes/auth.routes");
const expRoutes = require("./routes/exp.routes");
const demoRoutes = require("./routes/demo.routes");

require("./service/passport");

app.use(flash());
app.use(
  cookieSession({
    // milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // encript cookie name by using this key
    keys: [keys.cookieKey],
  })
);

// tell passport to use cookie
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/profile", profileRoutes);
app.use("/image", imageRoutes);
app.use("/auth", authRoutes);
app.use("/exp", expRoutes);
app.use("/demo", demoRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

if (process.env.NODE_ENV === "production") {
  // IF: No designated route handler for the request, request goes here
  // Express serve up production assets, like main.js or main.css
  // if any "GET" request comes in for any route, file, which we do not set route for, look into this directory, if anything inside matches, send it back
  app.use(express.static("client/build"));
  // express find anything inside client/build satisfying the request, the flow stops here.

  // IF: nothing matches, the following code will catch the request
  // Express will serve up index.html if it does not recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
// module.exports = app;
