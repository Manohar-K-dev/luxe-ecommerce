import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    contact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Name
// Email
// Password
// role
// Contact
// Date of Birth []

export const User = mongoose.model("User", schema);
