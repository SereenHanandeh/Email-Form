const User = require("../models/user");
const nodemailer = require("nodemailer");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//---------------------------------------------------------------------------------------------------

const registerUser = async (req, res) => {
  try {
    console.log("Received request body:", req.body); // لتتبع البيانات المستلمة

    // التأكد من أن الطلب يحتوي على البيانات المطلوبة
    const { name, age, mobile, email, paymentMethod } = req.body;
    if (!name || !email || !mobile) {
      return res
        .status(400)
        .json({ message: "Name, Email, and Mobile are required" });
    }

    // التحقق مما إذا كان المستخدم موجودًا بالفعل
    const userExists = await User.findOne({ $or: [{ email }, { mobile }] });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Email or Mobile already exists" });
    }

    // حفظ المستخدم في قاعدة البيانات
    const user = new User({ name, age, mobile, email, paymentMethod });
    await user.save();

    // إرسال البريد الإلكتروني
    try {
      await sendEmail(user); 
      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // لا تقم بإرجاع استجابة هنا، بل استمر في إرجاع استجابة نجاح مع تنبيه المستخدم فقط
    }

    // إرجاع استجابة نجاح بعد تسجيل المستخدم
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

//----------------------------------------------------------------------------------------
const sendEmail = async (req, res) => {
  const { name, email, mobile, age, paymentMethod } = req.body;

  console.log("Received email:", email);
  try {
    // تحقق من وجود البريد الإلكتروني
    if (!email) {
      console.error("No recipient email provided");
      return res.status(400).json({ message: "No recipient email provided" }); // إرسال استجابة فورية
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
      to: email, // البريد الإلكتروني للمستلم
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

    // إرسال البريد الإلكتروني
    await transporter.sendMail(mailOptions);

    // إرسال استجابة نجاح بعد إرسال البريد الإلكتروني
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    // تأكد من عدم إرسال استجابة بعد حدوث الخطأ
    if (!res.headersSent) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ message: "Error sending email", error: error.message });
    }
  }
};

module.exports = { registerUser, getUsers, sendEmail };
