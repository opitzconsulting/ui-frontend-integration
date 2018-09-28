const utils = require("./../../common/node.js/utils");
const app = utils.startModuleServer(
  "localhost",
  8000,
  "product",
  8001,
  "product-element",
  "Product"
);

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
