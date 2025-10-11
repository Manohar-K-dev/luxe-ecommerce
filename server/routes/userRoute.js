// import express from "express";
// // Controller
// import {
//   registerUser,
//   verifyUser,
//   loginUser,
//   adminLogin,
//   // userProfile,
// } from "../controller/userController.js";
// // Middleware
// // import { isAuth } from "../middleware/isAuth.js";

// const userRouter = express.Router();

// // POST:
// userRouter.post("/register", registerUser);
// userRouter.post("/otpVerify", verifyUser);
// userRouter.post("/login", loginUser);
// userRouter.post("/admin", adminLogin);
// // GET:
// // userRouter.get("/profile", isAuth, userProfile);

// export default userRouter;

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
