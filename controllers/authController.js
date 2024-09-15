import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, lastname, password, phoneNumber, location, email, role } =
      req.body;

    // Validation checks for required fields
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password is required",
      });
    }
    if (!phoneNumber) {
      return res.status(400).send({
        success: false,
        message: "Phone number is required",
      });
    }
    if (!location) {
      return res.status(400).send({
        success: false,
        message: "Location is required",
      });
    }
    if (!lastname) {
      return res.status(400).send({
        success: false,
        message: "Last name is required",
      });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already exists. Please login.",
      });
    }

    // Create new user
    const user = await userModel.create({
      name,
      lastname,
      password,
      phoneNumber,
      location,
      email,
      role,
    });

    // const token = user.createJWT();

    // Send success response
    res.status(201).send({
      success: true,
      message: "User created successfully",
      user: {
        email: user.email,
        lastName: user.lastName,
        name: user.name,
        role: user.role,
        location: user.location,
      },
      // token,
    });
  } catch (error) {
    next(error);
  }
};

// login controller
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });

    // If user is not found
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await user.comparePassword(password);

    // If the password does not match
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Exclude the password from the response
    user.password = undefined;

    // Generate a JWT token
    const token = user.createJWT();

    // Send success response
    return res.status(200).send({
      success: true,
      message: "User logged in successfully!",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong during login",
      error,
    });
  }
};
