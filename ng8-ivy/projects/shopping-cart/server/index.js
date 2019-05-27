const utils = require('./../../common/utils');
const app = utils.startModuleServer(
  "localhost",
  8000,
  "shopping-cart",
  8002,
  "shopping-cart-element",
  "Shopping cart"
);
