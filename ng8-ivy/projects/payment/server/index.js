const utils = require('./../../common/utils');
const app = utils.startModuleServer(
  "localhost",
  8000,
  "payment",
  8003,
  "payment-element",
  "Payment"
);
