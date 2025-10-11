import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxLength: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    contact: { type: String },
    birthDate: { type: Date },
  },
  { timestamps: true, minimize: false }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
