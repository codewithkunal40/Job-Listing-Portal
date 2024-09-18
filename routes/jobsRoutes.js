import express from "express";
import { userAuth } from "../middlewares/authMiddlware.js";
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  getAllJobsForSeekerController,
  jobStatsController,
  searchJobsController,
  updateJobController,
} from "../controllers/jobsController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - company
 *         - position
 *       properties:
 *         company:
 *           type: string
 *           description: The company offering the job.
 *           example: Google
 *         position:
 *           type: string
 *           description: The job position.
 *           example: Software Engineer
 *         salary:
 *           type: number
 *           description: The salary offered for the job.
 *           example: 120000
 *         qualification:
 *           type: string
 *           description: The qualification required for the job.
 *           example: Bachelor's Degree in Computer Science
 *         status:
 *           type: string
 *           description: The status of the job (e.g., open, closed).
 *           example: open
 *         workType:
 *           type: string
 *           description: The type of work (e.g., full-time, part-time).
 *           example: full-time
 *         workLocation:
 *           type: string
 *           description: The location of the job.
 *           example: Remote
 *       example:
 *         company: Google
 *         position: Software Engineer
 *         salary: 120000
 *         qualification: Bachelor's Degree in Computer Science
 *         status: open
 *         workType: full-time
 *         workLocation: Remote
 */

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management operations
 */

/**
 * @swagger
 * /create-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Job object to be created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /get-job:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalJobs:
 *                   type: number
 *                   description: Total number of jobs
 *                 jobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *                 numOfPage:
 *                   type: number
 *                   description: Number of pages
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /update-job/{id}:
 *   patch:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID to update
 *     requestBody:
 *       description: Job object with updated values
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Job not found
 *       403:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /delete-job/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID to delete
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 *       403:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /job-stats:
 *   get:
 *     summary: Get job statistics
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stats:
 *                   type: object
 *                   properties:
 *                     grouped:
 *                       type: array
 *                       items:
 *                         type: object
 *                     monthly:
 *                       type: array
 *                       items:
 *                         type: object
 *                     yearly:
 *                       type: array
 *                       items:
 *                         type: object
 *       401:
 *         description: Unauthorized
 */

router.post("/create-job", userAuth, createJobController);
router.get("/get-job", userAuth, getAllJobsController);
router.patch("/update-job/:id", userAuth, updateJobController);
router.delete("/delete-job/:id", userAuth, deleteJobController);
router.get("/job-stats", userAuth, jobStatsController);
router.get("/get-all-jobs", getAllJobsForSeekerController);
router.get("/search", searchJobsController);

export default router;
