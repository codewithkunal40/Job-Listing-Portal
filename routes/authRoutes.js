import express from "express";
import { registerController } from "../controllers/authController.js";
// objct for router
const router = express.Router();

// route
router.post("/register", registerController);
export default router;
