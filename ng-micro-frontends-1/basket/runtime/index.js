console.log("starting server...");

const express = require("express");
const path = require("path");
const http = require("http");

const port = 8002;

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type, User-Agent"
  );
  next();
});
app.listen(port, () =>
  console.log(`server started on port ${port} successfully.`)
);

const staticPath = path.join(__dirname, "./static");
app.use(express.static(staticPath));

const utils = require("./../../common/node.js/utlis");
utils.registerApp(
  "localhost",
  "8000",
  "basket",
  port,
  "basket-element",
  "Basket"
);
process.on("SIGINT", () => {
  utils.unregisterApp("localhost", "8000", "basket");
  setTimeout(() => process.exit(0), 1000);
});
