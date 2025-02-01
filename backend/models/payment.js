const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    method: { type: String, required: true }
});

module.exports = mongoose.model("Payment", PaymentSchema);
