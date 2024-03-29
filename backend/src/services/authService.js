const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      const error = new Error("User already exists.");
      error.statusCode = 409; // Conflict
      throw error;
    }

    const user = new User(userData);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    user.password = hashedPassword;

    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (userData) => {
  try {
    const { email, password } = userData;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User is not found");
      error.statusCode = 404; // Not Found
      throw error;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401; // Unauthorized
      throw error;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return { token, user };

  } catch (error) {
    throw error;
  }
};

module.exports = { registerUser, loginUser };
