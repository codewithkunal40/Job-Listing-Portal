import mongoose from "mongoose";
import jobsModel from "../models/jobsModel.js";

// CREATE JOB
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  try {
    req.body.createdBy = req.user.userId;
    const job = await jobsModel.create(req.body);
    res.status(201).json({ job });
  } catch (error) {
    next(error);
  }
};

// GET ALL JOBS
export const getAllJobsController = async (req, res, next) => {
  const { status, workType, search, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  // Filtering
  if (status && status !== "all") queryObject.status = status;
  if (workType && workType !== "all") queryObject.workType = workType;
  if (search) queryObject.position = { $regex: search, $options: "i" };

  try {
    let queryResult = jobsModel.find(queryObject);

    // Sorting
    if (sort === "latest") queryResult = queryResult.sort("-createdAt");
    if (sort === "a-z") queryResult = queryResult.sort("position");
    if (sort === "oldest") queryResult = queryResult.sort("createdAt");
    if (sort === "z-a") queryResult = queryResult.sort("-position");

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    queryResult = queryResult.skip(skip).limit(limit);

    const jobs = await queryResult;
    const totalJobs = await jobsModel.countDocuments(queryObject);
    const numOfPage = Math.ceil(totalJobs / limit);

    res.status(200).json({ totalJobs, jobs, numOfPage });
  } catch (error) {
    next(error);
  }
};

// UPDATE JOB
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  try {
    const job = await jobsModel.findOne({ _id: id });
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: `No job found with this id ${id}` });
    }

    if (req.user.userId !== job.createdBy.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this job" });
    }

    const updatedJob = await jobsModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ updatedJob });
  } catch (error) {
    next(error);
  }
};

// DELETE JOB
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const job = await jobsModel.findOne({ _id: id });
    if (!job) {
      return res
        .status(404)
        .json({ message: `No job found with this id ${id}` });
    }

    if (req.user.userId !== job.createdBy.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this job" });
    }

    await job.deleteOne();
    res.status(200).json({ message: "Success, Job Deleted!" });
  } catch (error) {
    next(error);
  }
};

// JOB STATS
export const jobStatsController = async (req, res) => {
  try {
    const { status, workType, workLocation } = req.query;
    const match = { createdBy: new mongoose.Types.ObjectId(req.user.userId) };

    if (status) match.status = status;
    if (workType) match.workType = workType;
    if (workLocation) match.workLocation = workLocation;

    const groupPipeline = [
      { $match: match },
      {
        $group: {
          _id: {
            status: "$status",
            workType: "$workType",
            workLocation: "$workLocation",
          },
          count: { $sum: 1 },
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

    const monthlyStatsPipeline = [
      { $match: match },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
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
      { $sort: { date: 1 } },
    ];

    const yearlyStatsPipeline = [
      { $match: match },
      {
        $group: {
          _id: { year: { $year: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          count: 1,
        },
      },
      { $sort: { year: 1 } },
    ];

    const groupedStats = await jobsModel.aggregate(groupPipeline);
    const monthlyStats = await jobsModel.aggregate(monthlyStatsPipeline);
    const yearlyStats = await jobsModel.aggregate(yearlyStatsPipeline);

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
    res.status(400).json({
      success: false,
      message: "Something went wrong while fetching job stats",
      error: error.message,
    });
  }
};
