const mongoose = require("mongoose");

// Define an asynchronous function to connect to the MongoDB database
const connectDataBaseServer = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.DB_HOST);
    // Log a success message if the connection is successful
    console.log("Connected to Mongodb", process.env.DB_HOST);
  } catch (error) {
    // Log an error message if the connection fails
    console.log("Connection to MongoDb failed", error.message);
  }
};

// Export the function so it can be used in other parts of the application
module.exports = connectDataBaseServer;
