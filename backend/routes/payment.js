const express = require("express");
const {
  addPaymentMethod,
  getPaymentMethods,
} = require("../controllers/payment");
const paymentRouter = express.Router();

paymentRouter.post("/", addPaymentMethod);
paymentRouter.get("/", getPaymentMethods);

module.exports = paymentRouter;
