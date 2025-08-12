const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a new user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log("User created: ", user);
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc Login a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  //compare password with hashed password

  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate JWT token
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

//@desc Get current user
//@route GET /api/users/current
//@access Private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get current user" });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
