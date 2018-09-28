console.log("starting server...");

const express = require("express");
const path = require("path");
const http = require("http");

const port = 8001;

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
  "product",
  port,
  "product-element",
  "Product"
);
process.on("SIGINT", () => {
  utils.unregisterApp("localhost", "8000", "product");
  setTimeout(() => process.exit(0), 1000);
});

const products = [
  {
    id: 1,
    title: "Product 1",
    description: "Product 1 description",
    price: 15.0,
    currency: "EUR"
  },
  {
    id: 2,
    title: "Product 2",
    description: "Product 2 description",
    price: 35.0,
    currency: "EUR"
  },
  {
    id: 3,
    title: "Product 3",
    description: "Product 3 description",
    price: 99.99,
    currency: "EUR"
  }
];

app.get("/api/products", (req, res) => {
  res.json({ products });
});
