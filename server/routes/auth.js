import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res
      .status(200)
      .json({ success: true, message: "Account Created Successfully" });
  } catch (error) {
    console.log("error", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in Adding User" });
  }
});

export default router;
