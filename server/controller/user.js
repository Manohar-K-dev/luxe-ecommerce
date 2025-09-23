import { User } from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";

// Registration: New User (SignUp)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    // Check: Email address already exists in DataBase
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists, Please Login" });
    }

    // Create: new User Data = 2 ->
    // 1. Convert: Raw Password to Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Create: new User Data
    user = { name, email, hashedPassword, contact };

    // Generate: OTP
    const otp = Math.floor(Math.random() * 1000000);

    // Create: Signed activation token (jwt)
    const activationToken = jwt.sign({ user, otp }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    // Send: OTP in user email
    // 1. Create: Text content for Email with OTP
    const emailContent = `Hello, Your One-Time Password (OTP) for LUXE is: ${otp} ⚠️ This OTP is valid for only 5 minutes. Do not share it with anyone for security reasons. If you did not request this, please ignore this email. - Team LUXE`;

    // 2. Content: Email
    await sendMail(
      email,
      "LUXE: Your One-Time Password (Valid for 5 Minutes)",
      emailContent
    );

    // Final: return
    return res.status(200).json({
      message: "OTP Sent to your mail",
      activationToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Verification: OTP (SignUp)
export const verifyUser = async (req, res) => {
  try {
    const { otp, activationToken } = req.body;

    const verify = jwt.verify(activationToken, process.env.JWT_SECRET);

    if (!verify) {
      return res.status(400).json({
        message: "OTP Expired",
      });
    }

    if (verify.otp !== otp) {
      return res.status(400).json({
        message: "Wrong OTP",
      });
    }

    await User.create({
      name: verify.user.name,
      email: verify.user.email,
      password: verify.user.hashedPassword,
      contact: verify.user.contact,
    });

    return res.status(200).json({
      message: "User Registration Success",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Registration: Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check: email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // Check: password
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // Generate: Signed Token
    const token = jwt.sign({ _id: user.id }, process.env.JWT_TOKEN, {
      expiresIn: "15d",
    });

    // Exclude: password
    const { password: userPassword, ...userDetails } = user.toObject();

    return res.status(200).json({
      message: `Welcome ${user.name} from LUXE`,
      token,
      userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Visit: User Profile
export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
