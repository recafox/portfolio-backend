const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    [
      "/auth",
      "/image",
      "/image/*",
      "/profile",
      "/demo",
      "/demo/*",
      "/exp",
      "/exp/*",
    ],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
