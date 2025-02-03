const Payment = require("../models/payment");

const addPaymentMethod = async (req, res) => {
  try {
    

    const { method } = req.body;

    if (!method) {
      return res.status(400).json({ message: "Payment method is required" });
    }

    const existingMethod = await Payment.findOne({ method });
    if (existingMethod) {
      return res.status(400).json({ message: "Payment method already exists" });
    }

    const payment = new Payment({ method });
    await payment.save();

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// جلب جميع طرق الدفع من قاعدة البيانات
const getPaymentMethods = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addPaymentMethod, getPaymentMethods };
