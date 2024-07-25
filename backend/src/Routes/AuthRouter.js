const endpoints = require("../Utils/endpoints");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");
const Errors = require("../Utils/Errors");

const AuthRouter = require("express").Router();

AuthRouter.post(endpoints.signup, async (req, res) => {
  try {
    const { name, email, dob, password } = req.body;

    if (!name || !email || !dob || !password) {
      throw new Error(Errors.request);
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT)
    );

    const userInfo = {
      name,
      email,
      dob,
      password: hashedPassword,
    };

    await UserModel.create(userInfo);

    res.status(201).json({
      message: "Signup Success",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

AuthRouter.post(endpoints.login, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error(Errors.request);
    }

    const userData = await UserModel.findOne({ email }).select("+password");

    if (!userData) {
      throw new Error(Errors.unauthorized);
    }

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      throw new Error(Errors.credential);
    }

    const token = jwt.sign(
      { userId: userData._id.toString() },
      process.env.SECRET_KEY
    );

    const userDetails = await UserModel.findOne({ email });
    res.status(200).json({
      message: "Login Successful",
      data: {
        token,
        userDetails,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = AuthRouter;
