const utils = require("./../../common/node.js/utils");
const app = utils.startModuleServer(
  "localhost",
  8000,
  "payment",
  8003,
  "payment-element",
  "Payment"
);
