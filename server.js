import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import morgan from "morgan";
//dotenv config
dotenv.config();

// mongodb connection
connectDB();
//rest object
const app = express();

// middle ware
app.use(morgan("dev"));
//routes
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Job Portal<h1>");
});

const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`
      .bgBlack.white
  );
});
