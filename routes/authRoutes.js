import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
// objct for router
const router = express.Router();

// route
router.post("/register", registerController);

router.post("/login", loginController);
export default router;
