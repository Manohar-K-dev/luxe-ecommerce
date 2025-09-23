import jwt from "jsonwebtoken";
import { User } from "../model/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(403).json({
        message: "Please Login to access",
      });
    }

    // Decode: JWT Signed
    const decodedData = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = await User.findById(decodedData._id);
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Please Login to access",
    });
  }
};
