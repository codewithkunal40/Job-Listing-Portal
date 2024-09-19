import express from "express";
import { userAuth } from "../middlewares/authMiddlware.js";
import {
  deleteUserController,
  getallResumeController,
  getJobSeekerProfile,
  getResumeController,
  getUserByNameController,
  getUserController,
  getUserOnIdController,
  updateUserController,
  uploadResumeController,
} from "../controllers/userController.js";
import { uploadResume } from "../middlewares/resumeUpload.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The email address of the user.
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           description: The password for the user account.
 *           example: securepassword123
 *         role:
 *           type: string
 *           description: The role of the user (e.g., admin, user).
 *           example: admin
 *       example:
 *         name: John Doe
 *         email: john.doe@example.com
 *         password: securepassword123
 *         role: admin
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

/**
 * @swagger
 * /update-user:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User object with updated values
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /get-user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /get-user/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to retrieve
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /delete-user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */

router.put("/update-user/:id", userAuth, updateUserController);
router.get("/get-user", userAuth, getUserController);
router.get("/get-user/:id", userAuth, getUserOnIdController);
router.post("/upload-resume", uploadResume, userAuth, uploadResumeController);
router.delete("/delete-user/:id", userAuth, deleteUserController);
router.get("/get-resume/:id", userAuth, getResumeController);
router.get("/get-all-resume", getallResumeController);
router.get("/get-user-name/:name", userAuth, getUserByNameController);
router.get("/job-seeker/:id", getJobSeekerProfile);
export default router;
