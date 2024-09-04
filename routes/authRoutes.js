import express from "express";
import { regsiterController } from "../controllers/authController.js";
// objct for router
const router = express.Router();

// route
router.post("/register", regsiterController);
export default router;
