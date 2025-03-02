import { User } from "../mongodb/model/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const create_user = async (req, res) => {
  const userData = req.body;
  if (!userData.name || !userData.email || !userData.password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const oldUser = await User.findOne({ email: userData.email });
    if (oldUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userData.password, salt);

    const newUser = new User({
      fullname: userData.name,
      email: userData.email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login_user = async (req, res) => {
  const userData = req.body;
  try {
    const isUserExist = await User.findOne({ email: userData.email });
    if (!isUserExist) {
      res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      userData.password,
      isUserExist.password
    );
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, isUserExist });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { create_user, login_user };
