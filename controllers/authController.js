import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { verifyPassword } from "../helpers/hashPassword.js";
const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).render("index", { message: "Username not found" });
    }

    const isPasswordCorrect = await verifyPassword(user.password, password);

    if (!isPasswordCorrect)
      return res
        .status(400)
        .render("index", { message: "Invalid username or password" });

    const userData = {
      _id: user._id,
      username: user.username,
    };

    const token = jwt.sign(userData, SECRET_KEY, { expiresIn: "4h" });
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 4 * 60 * 60 * 1000,
    });

    res.status(200).redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).render({ message: "Something went wrong" });
  }
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      username: username.toLowerCase(),
      password,
    });
    await user.save();
    res.status(201).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).render("signup", { message: "Something went wrong" });
  }
};
