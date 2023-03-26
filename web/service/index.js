const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const port = 7006;

app.use(express.static(__dirname + "/dist/"));

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://service-e2rjp624-1256721724.gz.apigw.tencentcs.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/",
    },
  })
);

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port);
