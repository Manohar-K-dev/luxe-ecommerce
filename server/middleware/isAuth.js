// import jwt from "jsonwebtoken";
// import userModel from "../model/userModel.js";

// export const isAuth = async (req, res, next) => {
//   try {
//     const token = req.headers.token;
//     if (!token) {
//       return res.status(403).json({
//         message: "Please Login to access",
//       });
//     }

//     // Decode: JWT Signed
//     const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await userModel.findById(decodedData._id);
//     next();
//   } catch (error) {
//     return res.status(403).json({
//       message: "Please Login to access",
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
    req.user = await userModel.findById(decodedData._id);
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Please login to access",
    });
  }
};
