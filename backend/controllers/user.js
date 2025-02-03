const User = require("../models/user");
const nodemailer = require("nodemailer");

// تسجيل المستخدم
const registerUser = async (req, res) => {
  try {
    const { name, age, mobile, email, paymentMethod } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { mobile }] });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Email or Mobile already exists" });
    }

    const user = new User({ name, age, mobile, email, paymentMethod });
    await user.save();

    sendEmail(user);
    res.status(201).json({ message: "User registered and email sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const sendEmail = async (req, res) => {
  try {
    const { name, email, mobile, age, paymentMethod } = req.body;

    // Validate that all required fields are provided
    if (!name || !email || !mobile || !age || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // تحقق من وجود المستخدم في قاعدة البيانات
    const user = await User.findOne({ email });

    if (!user) {
      // إذا لم يتم العثور على المستخدم، أرسل رسالة تفيد بذلك
      return res.status(404).json({ message: "User is not registered" });
    }

    // Configure email service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Registration Confirmation & Payment Method",
      html: `
        <h2>Hello ${name},</h2>
        <p>Your registration was successful!</p>
        <p><strong>Registered Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Age:</strong> ${age} years</li>
          <li><strong>Mobile:</strong> ${mobile}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Selected Payment Method:</strong> ${paymentMethod}</li>
        </ul>
        <p>Thank you for choosing our service! 🚀</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
};

module.exports = { registerUser, getUsers, sendEmail };
