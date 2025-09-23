import express from "express";
import {
  verifyUser,
  registerUser,
  loginUser,
  userProfile,
} from "../controller/user.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/profile", isAuth, userProfile);

export default router;
