const endpoints = require("../Utils/endpoints"); // Import endpoints for routing
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import jwt for generating tokens
const UserModel = require("../Models/UserModel"); // Import UserModel for database operations
const Errors = require("../Utils/Errors"); // Import error messages

const AuthRouter = require("express").Router(); // Create a new router object

// Define the signup route
AuthRouter.post(endpoints.signup, async (req, res) => {
  try {
    // Extract user details from the request body
    const { name, email, dob, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !dob || !password) {
      throw new Error(Errors.request); // Throw an error if any field is missing
    }

    // Find user with the email
    const userExist = await UserModel.findOne({ email });

    console.log(userExist);
    if (userExist) {
      throw new Error(Errors.userExist); // Throw an error if user already exist
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT) // Use salt from environment variables
    );

    // Prepare user info with hashed password
    const userInfo = {
      name,
      email,
      dob,
      password: hashedPassword,
    };

    // Create a new user in the database
    await UserModel.create(userInfo);

    // Respond with a success message
    res.status(201).json({
      message: "Signup Success",
    });
  } catch (error) {
    // Respond with an error message and status 400
    res.status(400).json({
      message: error.message,
    });
  }
});

// Define the login route
AuthRouter.post(endpoints.login, async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      throw new Error(Errors.request); // Throw an error if any field is missing
    }

    // Find the user by email and include the password field
    const userData = await UserModel.findOne({ email }).select("+password");

    // Check if the user exists
    if (!userData) {
      throw new Error(Errors.unauthorized); // Throw an error if user is not found
    }

    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, userData.password);

    // Check if the passwords match
    if (!isMatch) {
      throw new Error(Errors.credential); // Throw an error if passwords do not match
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      { userId: userData._id.toString() }, // Payload includes user ID
      process.env.SECRET_KEY // Secret key from environment variables
    );

    // Retrieve user details and respond with success message and token
    const userDetails = await UserModel.findOne({ email });
    res.status(200).json({
      message: "Login Successful",
      data: {
        token,
        userDetails,
      },
    });
  } catch (error) {
    // Respond with an error message and status 400
    res.status(400).json({
      message: error.message,
    });
  }
});

// Export the router to use in the main application
module.exports = AuthRouter;
