const User = require("../models/user");
const nodemailer = require("nodemailer");

// تسجيل المستخدم
const registerUser = async (req, res) => {
    const { name, age, mobile, email } = req.body;
    try {
        const user = new User({ name, age, mobile, email });
        await user.save();
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// اختيار طريقة الدفع وإرسال البريد الإلكتروني
exports.selectPayment = async (req, res) => {
    const { email, paymentMethod } = req.body;
    try {
        const user = await User.findOneAndUpdate({ email }, { paymentMethod }, { new: true });

        // إرسال بريد إلكتروني
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Payment Confirmation",
            text: `Hello ${user.name}, you have chosen ${paymentMethod} as your payment method.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.status(500).json({ error: error.message });
            res.status(200).json({ message: "Payment method updated and email sent", user });
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { registerUser };
