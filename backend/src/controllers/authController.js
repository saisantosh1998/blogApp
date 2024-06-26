const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const userData = req.body; //input

    const user = await authService.registerUser(userData); //processing

    //Registration is successful
    res.status(201).json({
      message: "User registered successfully",
      userId: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const userData = req.body;

    const { token, user } = await authService.loginUser(userData);

    res.status(200).json({
      message: "User logged in successfully",
      token,
      userId: user._id,
      username: user.username,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = { register, login };
