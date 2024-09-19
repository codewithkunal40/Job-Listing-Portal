import userModel from "../models/userModel.js";
import fs from "fs";
import path from "path";
import { uploadResume } from "../middlewares/resumeUpload.js";
export const updateUserController = async (req, res, next) => {
  const { name, email, lastname, location, phoneNumber, role } = req.body;

  // Check if all fields are provided
  if (!name || !email || !lastname || !location || !phoneNumber || !role) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      error: "Please provide all fields",
    });
  }

  try {
    const user = await userModel.findOne({ _id: req.user.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
        error: "No user found with the provided ID",
      });
    }

    // Update user details
    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.location = location;
    user.phoneNumber = phoneNumber;
    user.role = role;

    // Save the updated user details
    await user.save();

    // Generate a new token
    const token = user.createJWT();

    // Send success response
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    // Handle any server errors
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// get the user

export const getUserController = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      success: true,
      message: "Fetched the users successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong during fetching",
      error: error.message,
    });
  }
};

export const getUserOnIdController = async (req, res) => {
  try {
    // Fetch the id from route params
    const userId = req.params.id;

    // Check if userId exists and is valid
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
      });
    }

    // Check if the userId is a valid MongoDB ObjectId
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        success: false,
        message: "Invalid User ID format",
      });
    }

    // Fetch the user based on the valid id
    const user = await userModel.findOne({ _id: userId });

    // If user is not found
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // If the user is found, send the response
    return res.status(200).send({
      success: true,
      message: "User fetched on the basis of Id",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cannot fetch the current user",
      error,
    });
  }
};

// delete user controller

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message, // Send only the error message for security reasons
    });
  }
};

// Resume upload controller
export const uploadResumeController = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming you have user authentication middleware
    const resumePath = req.file.path; // Multer gives the path of the uploaded file

    // Find the user and update the resume field
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.resume = resumePath; // Set the path of the uploaded resume
    await user.save();

    return res.status(200).json({
      message: "Resume uploaded successfully",
      resume: resumePath,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import { fileURLToPath } from "url";
import mongoose from "mongoose";

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getResumeController = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(`Fetching reume for userId:${userId}`);
    // Get userId from route parameters
    const user = await userModel.findById(userId);

    if (!user || !user.resume) {
      return res
        .status(404)
        .json({ message: "Resume not found for this user" });
    }

    // Adjust the path based on where you're storing the file
    const resumePath = path.join(__dirname, "..", user.resume);

    // Check if file exists
    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({ message: "Resume file not found" });
    }

    // Send the file
    res.sendFile(resumePath);
  } catch (error) {
    console.error("Error fetching resume:", error); // Improved logging
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getallResumeController = async (req, res) => {
  try {
    const { resume } = req.body;
    const response = await userModel.find(resume);
    if (!response) {
      res.status(500).send({
        message: "REsume not fetched for  all  users",
        success: false,
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetched reume succefuuly for all apllicants",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

export const getUserByNameController = async (req, res) => {
  try {
    const { name } = req.params;

    // Check if name is provided
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "User name is required",
      });
    }

    // Fetch the user based on the name
    const user = await userModel.findOne({ name });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Controller to fetch job seeker profile by ID
export const getJobSeekerProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID format" });
    }

    // Find the user by ID and role
    const user = await userModel.findOne({ _id: id, role: "job seeker" });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Job Seeker not found" });
    }

    // Return the job seeker profile
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        location: user.location,
        phoneNumber: user.phoneNumber,
        resume: user.resume,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error fetching job seeker profile:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
