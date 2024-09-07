import express from "express";
import { userAuth } from "../middlewares/authMiddlware.js";
import { createJobController, deleteJobController, getAllJobsController, updateJobController } from "../controllers/jobsController.js";

const router =express.Router();

//routes
//CREATE JOB || POST
router.post('/create-job',userAuth,createJobController);

//GET JOBS || GET 
router.get('/get-job',userAuth,getAllJobsController);


//UPDATE JOBS || PATCH
router.patch("/update-job/:id",userAuth,updateJobController);

//DELETE JOBS || DELETE 
router.delete("/delete-job/:id",userAuth,deleteJobController);
export default router;