const Payment = require("../models/payment");

const getPaymentMethods = async (req, res) => {
    const methods = await Payment.find();
    res.json(methods);
};

module.exports = { getPaymentMethods };
