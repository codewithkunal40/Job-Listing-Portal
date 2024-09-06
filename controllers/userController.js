import userModel from "../models/userModel.js";

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
