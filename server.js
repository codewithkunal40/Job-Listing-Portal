import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import morgan from "morgan";
import testRoute from "./routes/testRoutes.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
//dotenv config
dotenv.config();

// mongodb connection
connectDB();
//rest object
const app = express();
// middlweare
app.use(express.json());
app.use(cors());

// middle ware
app.use(morgan("dev"));

//routes

app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoutes);

app.get("/",(req,res) => {
  res.send("<h1>Welcome to Job Application</h1>");
})


const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`
      .bgBlack.white
  );
});
