require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// اتصال بقاعدة البيانات
connectDB();

// استيراد الراوترات
app.use("/users", require("./routes/userRoutes"));
app.use("/payments", require("./routes/paymentRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
