import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
// user schema fro job prtal
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Nam is  required"],
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      validate: validator.isEmail,
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
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
export default mongoose.model("User", userSchema);
