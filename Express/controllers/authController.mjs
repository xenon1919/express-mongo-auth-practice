// authController.mjs

import User from "./../models/userModel.mjs";
import asyncErrorHandler from "./../utils/asyncErrorHandler.mjs";

const signup = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide name, email, and password.",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      status: "fail",
      message: "User with this email already exists.",
    });
  }

  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

export default { signup };
