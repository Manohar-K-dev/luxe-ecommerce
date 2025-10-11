import express from "express";
import {
  registerUser,
  verifyUser,
  loginUser,
  adminLogin,
} from "../controller/userController.js";

const userRouter = express.Router();

// POST Routes
userRouter.post("/register", registerUser);
userRouter.post("/otpVerify", verifyUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

export default userRouter;
