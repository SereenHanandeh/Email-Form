const User = require("../models/user");
const nodemailer = require("nodemailer");

// تسجيل المستخدم
// const registerUser = async (req, res) => {
//   try {
//     const { name, age, mobile, email, paymentMethod } = req.body;

//     const userExists = await User.findOne({ $or: [{ email }, { mobile }] });
//     if (userExists) {
//       return res
//         .status(400)
//         .json({ message: "Email or Mobile already exists" });
//     }

//     const user = new User({ name, age, mobile, email, paymentMethod });
//     await user.save();

//     sendEmail(req, res);
//     res.status(201).json({ message: "User registered and email sent" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const sendEmail = async (user, res) => {
  try {
    const { name, email, mobile, age, paymentMethod } = user;
    if (!name || !email || !mobile || !age || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

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

    // Send email
    await transporter.sendMail(mailOptions);

    // Send success response
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    // Send error response only once
    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: "Error sending email", error: error.message });
    }
  }
};

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

    sendEmail(user, res); 
    res.status(201).json({ message: "User registered and email sent" }); // Do not send res after calling sendEmail
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, getUsers, sendEmail };
