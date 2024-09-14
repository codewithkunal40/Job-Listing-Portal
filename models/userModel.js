import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import JWT from "jsonwebtoken";

// User schema for job portal
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      select: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    location: {
      type: String,
      default: "India",
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
    },
    resume: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["job seeker", "employer"],
      required: [true, "Role is required"],
      default: "job seeker",
    },
  },
  { timestamps: true }
);

// Middleware to hash password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with stored hashed password
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

// Method to create JWT token
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export default mongoose.model("User", userSchema);
