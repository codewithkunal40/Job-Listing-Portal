import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import JWT from "jsonwebtoken";
// user schema for job portal
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
    },
    lastname: {
      type: String,
      required: [true, "Last Nam is  required"],
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      validate: validator.isEmail,
      select: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    location: {
      type: String,
      default: "India",
    },
    phoneNumber: {
      type: String,
      required: [true, "phone NUmber is required"],
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

// middle ware
userSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};
// jwt token
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
export default mongoose.model("User", userSchema);
