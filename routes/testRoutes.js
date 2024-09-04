import express from "express";
import { testPostController } from "../controllers/testController.js";
// object for router
const router = express.Router();

// test route
router.post("/test-post", testPostController);
export default router;
