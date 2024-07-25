const mongoose = require("mongoose");

const connectDataBaseServer = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    console.log("Connected to Mongodb", process.env.DB_HOST);
  } catch (error) {
    console.log("Connection to MongoDb failed", error.message);
  }
};

module.exports = connectDataBaseServer;
