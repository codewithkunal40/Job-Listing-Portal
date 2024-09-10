import express from "express";
import { testPostController } from "../controllers/testController.js";
import { userAuth } from "../middlewares/authMiddlware.js";

// object for router
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     TestPost:
 *       type: object
 *       properties:
 *         exampleField:
 *           type: string
 *           description: An example field for the test POST request.
 *           example: "example value"
 *       required:
 *         - exampleField
 *       example:
 *         exampleField: "example value"
 */

/**
 * @swagger
 * tags:
 *   name: Test
 *   description: Test routes for testing purposes
 */

/**
 * @swagger
 * /test-post:
 *   post:
 *     summary: Test POST endpoint
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Request body for the test POST request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestPost'
 *     responses:
 *       200:
 *         description: Successfully processed the POST request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: "POST request successful"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

router.post("/test-post", userAuth, testPostController);

export default router;
