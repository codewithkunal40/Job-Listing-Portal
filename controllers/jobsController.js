import mongoose from "mongoose";
import jobsModel from "../models/jobsModel.js";

//CREATE JOB

export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please provide all fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};

//=========GET JOBS ==========

export const getAllJobsController = async (req, res, next) => {
  const { status, workType, search, sort } = req.query;
  // conditon for sercing
  const queryObject = {
    createdBy: req.user.userId,
  };
  // logic for filter
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  const queryResult = jobsModel.find(queryObject);

  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "A-Z") {
    queryResult = queryResult.sort("-position");
  }
  const jobs = await queryResult;
  // const jobs = await jobsModel.find({ createdBy: req.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};

//========UPDATE JOBS ==========
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  //validation
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`no jobs found with this id ${id}`);
  }
  if (!req.user.userId == job.createdBy.toString()) {
    next("You are not authorized to update this job");
    return;
  }
  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  //res
  res.status(200).json({ updateJob });
};

//======= DELETE JOBS =======

export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`No job found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorized to delete this job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({ message: "Success,Job Deleted !" });
};

// job dtts and filet

export const jobStatsController = async (req, res) => {
  try {
    // Extract filters from query parameters
    const { status, workType, workLocation } = req.query;

    // Build the match object
    const match = { createdBy: new mongoose.Types.ObjectId(req.user.userId) };

    if (status) {
      match.status = status;
    }
    if (workType) {
      match.workType = workType;
    }
    if (workLocation) {
      match.workLocation = workLocation;
    }

    // Define the aggregation pipeline for grouped stats
    const groupPipeline = [
      { $match: match },
      {
        $group: {
          _id: {
            status: "$status",
            workType: "$workType",
            workLocation: "$workLocation",
          },
          count: { $sum: 1 }, // Count the number of jobs in each group
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id.status",
          workType: "$_id.workType",
          workLocation: "$_id.workLocation",
          count: 1,
        },
      },
    ];

    // Define the aggregation pipeline for monthly stats
    const monthlyStatsPipeline = [
      { $match: match },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 }, // Count the number of jobs in each month
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              {
                $cond: [
                  { $lt: ["$_id.month", 10] },
                  { $concat: ["0", { $toString: "$_id.month" }] },
                  { $toString: "$_id.month" },
                ],
              },
            ],
          },
          count: 1,
        },
      },
      { $sort: { date: 1 } }, // Sort by formatted date
    ];

    // Define the aggregation pipeline for yearly stats
    const yearlyStatsPipeline = [
      { $match: match },
      {
        $group: {
          _id: { year: { $year: "$createdAt" } },
          count: { $sum: 1 }, // Count the number of jobs in each year
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          count: 1,
        },
      },
      { $sort: { year: 1 } }, // Sort by year
    ];

    // Perform the aggregation
    const groupedStats = await jobsModel.aggregate(groupPipeline);
    const monthlyStats = await jobsModel.aggregate(monthlyStatsPipeline);
    const yearlyStats = await jobsModel.aggregate(yearlyStatsPipeline);

    // Default response if no filters applied
    if (!status && !workType && !workLocation) {
      return res.status(200).json({
        success: true,
        stats: {
          grouped: groupedStats,
          monthly: monthlyStats,
          yearly: yearlyStats,
        },
      });
    }

    // Return filtered statistics
    res.status(200).json({
      success: true,
      stats: {
        grouped: groupedStats,
        monthly: monthlyStats,
        yearly: yearlyStats,
      },
    });
  } catch (error) {
    console.error("Error fetching job stats:", error);
    res.status(400).send({
      success: false,
      message: "Something went wrong while fetching job stats",
      error: error.message,
    });
  }
};
