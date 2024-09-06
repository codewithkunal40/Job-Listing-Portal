import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
import { userAuth } from "../middlewares/authMiddlware.js";
// objct for router
const router = express.Router();

// route
router.post("/register", registerController);

router.post("/login", userAuth, loginController);
export default router;
