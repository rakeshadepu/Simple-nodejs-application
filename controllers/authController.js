//Necessary imports
const User = require("../models/User.js");
const jwt = require("jsonwebtoken"); //for generating tokens for authorization
const crypto = require("crypto"); // for generating confirmation code
const {sendConfirmationEmail} = require("../utils/emailService.js")

//generates confirmationcode
const generateConfirmationCode = () => crypto.randomBytes(16).toString("hex");

//jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Regex to validate email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// User Signup
exports.signup = async (req, res) => {
  const { Name, email, password } = req.body;
  //validation for signup
  if (!Name) {
    res.status(500).json({ message: "Name is required" });
  }
  if (!email) {
    res.status(500).json({ message: "email is required" });
  }
  if (!password && password.length<6) {
    res.status(500).json({ message: "Password is required and must be greater than 6 characters" });
  }

  try {
    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const confirmationCode = generateConfirmationCode();

    // Create the user
    const user = await User.create({
      Name,
      email,
      password,
      confirmationCode,
      isConfirmed: false,
    });
    // const token = generateToken(user._id);

    // Send confirmation email
    await sendConfirmationEmail(user.email, user.Name,confirmationCode);

    // Respond with success (201 code status ok)
    return res
      .status(201)
      .send({
        message:
          "User registered successfully. Please check your email for the confirmation code.",
        user: { id: user._id, Name, email },
        token,
      });
  } catch (error) {
    console.error(error);
    // Handle unhandled errors
    return res.status(500).json({ message: "Error registering user", error });
  }
};


exports.verifyEmail = async (req, res) => {
  const { email, confirmationCode } = req.body;

  try {
    const user = await User.findOne({ email, confirmationCode });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid confirmation code or email." });
    }

    user.isConfirmed = true;
    user.confirmationCode = null; // Clear the code after confirmation
    await user.save();

    return res.status(200).json({ message: "Email confirmed successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to confirm email", error });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if user has verified their email
    if (!user.isConfirmed) {
      return res.status(401).json({ 
        message: "Please verify your email before logging in. A verification email has been sent." 
      });
    }

    // Check if the password is correct
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Respond with success and user details
    res.status(200).send({
      message: "Logged in successfully",
      user: { id: user._id, Name: user.Name, email },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};
