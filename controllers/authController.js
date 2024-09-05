import userModel from "../models/userModel.js";

export const regsiterController = async (req, res, next) => {
  try {
    const { name, lastName, password, phoneNumber, location, email, role } =
      req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is not provided",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is not provided",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password is not provided",
      });
    }
    if (!phoneNumber) {
      return res.status(400).send({
        success: false,
        message: "contact number not provided is not provided",
      });
    }
    if (!location) {
      return res.status(400).send({
        success: false,
        message: "location is not provided",
      });
    }
    if (!lastName) {
      return res.status(400).send({
        success: false,
        message: "lastname is not provided",
      });
    }
    // /for exiting user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "email already exists please login",
      });
    }

    const user = await userModel.create({
      email,
      password,
      lastName,
      name,
      location,
      phoneNumber,
      role,
    });
    res.status(201).send({
      success: true,
      message: "USer created Succesfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
