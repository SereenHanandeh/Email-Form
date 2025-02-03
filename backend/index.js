require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// اتصال بقاعدة البيانات
require("./models/db");

const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");


app.use(express.json());

// استيراد الراوترات
app.use("/users", userRouter);
app.use("/payments", paymentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
