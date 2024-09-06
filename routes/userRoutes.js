import express from "express";
import { userAuth } from "../middlewares/authMiddlware.js";
import { updateUserController } from "../controllers/userController.js";

//router object 
const router = express.Router();


//UPDATE USER || PUT
router.put('/update-user',userAuth,updateUserController);
export default router;