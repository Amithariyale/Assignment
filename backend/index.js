require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDataBaseServer = require("./src/db/connection");
const AuthRouter = require("./src/Routes/AuthRouter");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter);

connectDataBaseServer();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
