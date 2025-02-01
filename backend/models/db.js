const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to project DB");
  })
  .catch((err) => {
    console.error("DB Connection error:", err);
  });
