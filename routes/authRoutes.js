import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
import { userAuth } from "../middlewares/authMiddlware.js";
import rateLimit from "express-rate-limit";
// objct for router
const router = express.Router();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// route
router.post("/register", limiter, registerController);

router.post("/login", userAuth, limiter, loginController);
export default router;
