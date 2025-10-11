import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Model
import userModel from "../model/userModel.js";
// middleware
// import sendMail from "../middleware/sendMail.js";

// Registration: New User (SignUp)
const registerUser = async (req, res) => {
  try {
    // Request: data from body
    const { name, email, password, confirmPassword } = req.body;

    // Check: all input is fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check: Email address already exists or not [ DataBase ]
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login",
      });
    }

    // Validate: email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Validate: password strength
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and include Lower, uppercase, number and symbol",
      });
    }

    // Check: confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // After: All is Pass ->
    // Generate: OTP (6-digit)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Convert: Raw Password to Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create: Signed activation token (contains user info + OTP)
    const token = jwt.sign(
      { user: { name, email, password: hashedPassword }, otp },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    // // Send: OTP in email = 2 ->
    // // 1. Create: Text content for Email with OTP
    // const emailContent = `Hello, Your One-Time Password (OTP) for LUXE is: ${otp} ⚠️ This OTP is valid for only 5 minutes. Do not share it with anyone for security reasons. If you did not request this, please ignore this email. - Team LUXE`;

    // // 2. Content: Email [ Send ]
    // await sendMail(
    //   email,
    //   "LUXE: OTP for Registration (Valid for 5 Minutes)",
    //   emailContent
    // );

    // Return OTP in response (no email sending)
    return res.status(200).json({
      success: true,
      message: "OTP generated successfully",
      token,
      otp: otp,
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

// Verification: OTP (SignUp)
const verifyUser = async (req, res) => {
  try {
    // Request: data from body
    const { otp, token } = req.body;

    // Check: body have values
    if (!otp || !token) {
      return res.status(400).json({
        success: false,
        message: "Something Wrong",
      });
    }

    // Verify: JWT
    let verify;
    try {
      verify = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Check: Match OTP
    if (verify.otp.toString() !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "Wrong OTP",
      });
    }

    const { name, email, password } = verify.user;

    // Create: new User Data
    const newUser = new userModel({
      name,
      email,
      password,
    });

    const user = await newUser.save();

    // Remove: password before sending response
    const { password: _, ...userData } = user.toObject();

    // Final: return
    return res.status(200).json({
      success: true,
      message: "User Registration Success",
      user: userData,
    });
  } catch (error) {
    console.error("OTP verification error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Verification failed. Please try again.",
    });
  }
};

// Login: User Login
const loginUser = async (req, res) => {
  try {
    // Request: data from body
    const { email, password } = req.body;

    // Check: all input is fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check: Email address already exists or not [ DataBase ]
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Check: password is correct or wrong
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate: JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    // Exclude: password
    const { password: userPassword, ...userData } = user.toObject();

    // Final: return
    return res.status(200).json({
      success: true,
      message: `Welcome ${user.name} from LUXE`,
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};

// ADMIN
// Registration: Login Admin
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
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { registerUser, verifyUser, loginUser, adminLogin };
