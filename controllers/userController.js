import userModel from "../models/userModel.js";
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
    const userId = req.body.user._id;
    const user = await userModel.findOne({ userId });
    return res.status(200).send({
      success: true,
      message: "User fetched on the basis of Id",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Caanot fetch the current user",
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
