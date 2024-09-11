import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import morgan from "morgan";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSantize from "express-mongo-sanitize";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
// routes import
import testRoute from "./routes/testRoutes.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
// dotenv config
dotenv.config();

// mongodb connection
connectDB();

// api config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Listing Portal",
      description: "Node Express Job Listing Portal",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerJSDoc(options);

// rest object
const app = express();

// Enable proxy trust with a more secure configuration
app.set("trust proxy", 1); // Trust the first proxy

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// security middleware
app.use(helmet());
app.use(xss());
app.use(mongoSantize());

// routes
app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

// middleware for validation
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Job Application</h1>");
});

const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`
      .bgBlack.white
  );
});
