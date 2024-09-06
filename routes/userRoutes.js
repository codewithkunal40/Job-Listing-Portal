import express from "express";
import { userAuth } from "../middlewares/authMiddlware.js";
import {
  deleteUserController,
  getUserController,
  getUserOnIdController,
  updateUserController,
} from "../controllers/userController.js";

//router object
const router = express.Router();

//UPDATE USER || PUT
router.put("/update-user", userAuth, updateUserController);

// get all users
router.get("/get-user", userAuth, getUserController);

// get single user
router.get("/get-user/:id", userAuth, getUserOnIdController);

// delte the user on the basis of id
router.delete("/delete-user/:id", userAuth, deleteUserController);

export default router;
