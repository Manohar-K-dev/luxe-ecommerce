// import jwt from "jsonwebtoken";
// import userModel from "../model/userModel.js";

// export const isAuth = async (req, res, next) => {
//   try {
//     const token = req.headers.token;
//     if (!token) {
//       return res.status(403).json({
//         message: "Please login to access",
//       });
//     }

//     const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await userModel.findById(decodedData._id);
//     next();
//   } catch (error) {
//     return res.status(403).json({
//       message: "Please login to access",
//     });
//   }
// };

import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(403).json({
        message: "Please login to access",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // For login tokens, it has userId; for signup tokens, it has user data
    if (decodedData.userId) {
      // This is a login token
      req.user = await userModel.findById(decodedData.userId);
    } else if (decodedData.user) {
      // This is a signup OTP token - just attach the decoded data
      req.user = decodedData.user;
    } else {
      return res.status(403).json({
        message: "Invalid token",
      });
    }

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(403).json({
      message: "Please login to access",
    });
  }
};
