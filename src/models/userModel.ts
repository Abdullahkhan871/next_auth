import mongoose from "mongoose";

interface userModel {
  username: string;
  email: string;
  password: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  forgetPasswordToken?: string;
  forgetPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

const userSchema = new mongoose.Schema<userModel>({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
