// Load environment variables from a .env file into process.env
require("dotenv").config();

// Import required modules
const express = require("express"); // Express framework for building the server
const cors = require("cors"); // CORS middleware to handle cross-origin requests
const connectDataBaseServer = require("./src/db/connection"); // Function to connect to the database
const AuthRouter = require("./src/Routes/AuthRouter"); // Router for authentication routes

// Define the port for the server, default to 8080 if not specified in environment variables
const PORT = process.env.PORT || 8080;

// Create an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Use the AuthRouter for routes starting with '/auth'
app.use("/auth", AuthRouter);

// Connect to the MongoDB database
connectDataBaseServer();

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log the server status
});
