require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// تفعيل CORS
app.use(cors());

// استبدال bodyParser بـ express.json()
app.use(express.json());

// اتصال بقاعدة البيانات
require("./models/db");

// استيراد الراوترات
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");

app.use("/users", userRouter);
app.use("/payments", paymentRouter);

app.use("*", (req, res) => res.status(404).json("No Contant At this Path"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
