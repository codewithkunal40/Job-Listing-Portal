import express from "express";
import { testPostController } from "../controllers/testController.js";
import { userAuth } from "../middlewares/authMiddlware.js";
// object for router
const router = express.Router();

// test route
router.post("/test-post", userAuth, testPostController);
export default router;
