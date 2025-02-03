const express = require("express");
const { registerUser, getUsers, sendEmail } = require("../controllers/user");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/", getUsers);
userRouter.post("/sendEmail", sendEmail);

module.exports = userRouter;
