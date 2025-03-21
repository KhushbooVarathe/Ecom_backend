const User = require("../models/User");
const bcrypt = require("bcryptjs");

const SignUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    console.log("Checking if user exists...");
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User  already exists:", existingUser);
      return res.status(400).json({ error: "User with this Email already exists" });
    }

    console.log("Creating new user...");
    const user = new User({ email, password });
    await user.save();

    console.log("User created successfully:", user);
    res.status(201).json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};


const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid login credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid login credentials" });
    }

    res.json({
      message: "Login successful",
      userId: user._id,
      username: user.email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { SignUp, Login };
