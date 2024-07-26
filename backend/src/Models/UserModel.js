// Import the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Regular expression to validate email format
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Define the schema for the User collection
const UserSchema = new mongoose.Schema({
  // Define the 'name' field with validation and error messages
  name: {
    type: String,
    required: [true, "Please enter the name"], // Custom error message if 'name' is missing
  },
  // Define the 'email' field with validation, uniqueness, and custom error messages
  email: {
    type: String,
    required: [true, "Please enter the email"], // Custom error message if 'email' is missing
    match: [emailRegex, "Please enter a valid email"], // Regex validation for email format
    unique: [true, "Email already exists"], // Ensure email is unique across users
  },
  // Define the 'dob' (date of birth) field with validation and error messages
  dob: {
    type: Number,
    required: [true, "Please enter the date of birth"], // Custom error message if 'dob' is missing
  },
  // Define the 'password' field with validation and error messages
  password: {
    type: String,
    required: [true, "Please enter the password"], // Custom error message if 'password' is missing
    select: false, // Exclude 'password' field from query results by default
  },
});

// Create a model using the UserSchema
const UserModel = mongoose.model("User", UserSchema);

// Export the UserModel to be used in other parts of the application
module.exports = UserModel;
