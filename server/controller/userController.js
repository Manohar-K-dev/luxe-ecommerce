import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";
import sendMail from "../middleware/sendMail.js";

// // Registration: New User
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, confirmPassword } = req.body;

//     if (!name || !email || !password || !confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     let existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists, please login",
//       });
//     }

//     if (!validator.isEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter a valid email address",
//       });
//     }

//     if (!validator.isStrongPassword(password)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Password must be at least 8 characters long and include lowercase, uppercase, number and symbol",
//       });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "Passwords do not match",
//       });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000);
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const token = jwt.sign(
//       { user: { name, email, password: hashedPassword }, otp },
//       process.env.JWT_SECRET,
//       { expiresIn: "5m" }
//     );

//     const emailContent = `Hello, Your One-Time Password (OTP) for LUXE is: ${otp} ⚠️ This OTP is valid for only 5 minutes. Do not share it with anyone for security reasons. If you did not request this, please ignore this email. - Team LUXE`;

//     await sendMail(
//       email,
//       "LUXE: OTP for Registration (Valid for 5 Minutes)",
//       emailContent
//     );

//     return res.status(200).json({
//       success: true,
//       message: "OTP sent to your email",
//       token,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

const registerUser = async (req, res) => {
  try {
    console.log("🔍 SIGNUP STARTED - Request body:", req.body);

    const { name, email, password, confirmPassword } = req.body;

    // Add validation logs
    console.log("🔍 Validating fields...");
    if (!name || !email || !password || !confirmPassword) {
      console.log("❌ Missing fields");
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("🔍 Checking existing user...");
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists");
      return res.status(400).json({
        success: false,
        message: "User already exists, please login",
      });
    }

    console.log("🔍 Validating email...");
    if (!validator.isEmail(email)) {
      console.log("❌ Invalid email");
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    console.log("🔍 Validating password...");
    if (!validator.isStrongPassword(password)) {
      console.log("❌ Weak password");
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and include lowercase, uppercase, number and symbol",
      });
    }

    console.log("🔍 Checking password match...");
    if (password !== confirmPassword) {
      console.log("❌ Passwords don't match");
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    console.log("🔍 Generating OTP...");
    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log("🔍 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("🔍 Generating JWT token...");
    const token = jwt.sign(
      { user: { name, email, password: hashedPassword }, otp },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    console.log("🔍 TEMPORARILY SKIPPING EMAIL...");
    // TEMPORARY: Skip email for testing
    // const emailContent = `Hello, Your One-Time Password (OTP) for LUXE is: ${otp} ⚠️ This OTP is valid for only 5 minutes. Do not share it with anyone for security reasons. If you did not request this, please ignore this email. - Team LUXE`;

    // await sendMail(
    //   email,
    //   "LUXE: OTP for Registration (Valid for 5 Minutes)",
    //   emailContent
    // );

    console.log("✅ SIGNUP SUCCESS - OTP generated (email skipped)");
    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
      token,
      otp: otp, // Include OTP in response for testing
    });
  } catch (error) {
    console.error("❌ SIGNUP ERROR DETAILS:");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error(
      "Environment check - JWT_SECRET exists:",
      !!process.env.JWT_SECRET
    );
    console.error("Environment check - GMAIL exists:", !!process.env.GMAIL);

    return res.status(500).json({
      success: false,
      message: "Internal server error during registration",
    });
  }
};

// Verification: OTP
const verifyUser = async (req, res) => {
  try {
    const { otp, token } = req.body;

    if (!otp || !token) {
      return res.status(400).json({
        success: false,
        message: "OTP and token are required",
      });
    }

    let verify;
    try {
      verify = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    if (verify.otp.toString() !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "Wrong OTP",
      });
    }

    const { name, email, password } = verify.user;

    const newUser = new userModel({
      name,
      email,
      password,
    });

    const user = await newUser.save();
    const { password: _, ...userData } = user.toObject();

    return res.status(200).json({
      success: true,
      message: "User registration successful",
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Login: User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    const { password: userPassword, ...userData } = user.toObject();

    return res.status(200).json({
      success: true,
      message: `Welcome ${user.name} from LUXE`,
      token,
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ADMIN: Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      return res.status(200).json({
        success: true,
        token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { registerUser, verifyUser, loginUser, adminLogin };
