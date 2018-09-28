const utils = require("./../../common/node.js/utils");
const app = utils.startModuleServer(
  "localhost",
  8000,
  "basket",
  8002,
  "basket-element",
  "Basket"
);
