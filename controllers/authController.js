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

    const token = user.createJWT();

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
      token,
    });
  } catch (error) {
    next(error);
  }
};

// login controller
export const loginController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Error in login crdentails please login again",
      });
    }

    const user = await userModel.findOne({ email, name });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      next("Invalid username or password");
    }
    user.password = undefined;
    const token = user.createJWT();
    return res.status(200).send({
      success: true,
      message: "User login succesfully!!",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Soemthing went wrng during login",
      error,
    });
  }
};
