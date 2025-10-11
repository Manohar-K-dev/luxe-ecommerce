import React, { useContext, useState } from "react";
import { RiMailLine, RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const { login, signup, verifyOtp, loading } = useContext(ShopContext);
  const [loginType, setLoginType] = useState("login");
  const [otpStep, setOtpStep] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [signupToken, setSignupToken] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Validation
    if (loginType === "signup") {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
      }
    }

    if (loginType === "login") {
      // Login flow
      const success = await login(formData.email, formData.password);
      if (success) {
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      }
    } else {
      // Signup flow
      const response = await signup(
        formData.name,
        formData.email,
        formData.password
      );
      if (response && response.success && response.token) {
        // Store the token for OTP verification
        setSignupToken(response.token);
        setOtpStep(true);
      }
    }
  };

  const handleOtpVerification = async () => {
    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    if (!signupToken) {
      alert("Something went wrong. Please try signing up again.");
      return;
    }

    const success = await verifyOtp(otp, signupToken);
    if (success) {
      setOtpStep(false);
      setOtp("");
      setSignupToken("");
      setLoginType("login");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleBackToSignup = () => {
    setOtpStep(false);
    setOtp("");
    setSignupToken("");
  };

  const handleResendOtp = async () => {
    // You can implement resend OTP functionality here
    alert("Resend OTP functionality can be implemented");
  };

  return (
    <div className="select-none flex flex-col items-center gap-8 py-16">
      <img src="/shopping-cart.png" alt="LUXE Logo" className="w-16" />

      {otpStep ? (
        // OTP Verification Section
        <>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">
              Verify Your Email
            </h2>
            <p className="text-gray-600 mt-2">
              Enter the OTP sent to your email
            </p>
            <p className="text-sm text-luxe font-medium mt-1">
              {formData.email}
            </p>
          </div>

          <div className="flex flex-col gap-4 w-80">
            <div>
              <label htmlFor="otp" className="text-sm text-gray-600 block mb-2">
                OTP (6-digit)
              </label>
              <div className="flex items-center justify-between gap-3 border border-gray-300 rounded-lg px-3 py-2 focus-within:border-luxe transition duration-300">
                <input
                  type="text"
                  placeholder="000000"
                  className="outline-none w-full text-center text-lg font-mono tracking-widest"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  maxLength={6}
                  required
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                OTP is valid for 5 minutes
              </p>
            </div>

            <button
              onClick={handleOtpVerification}
              disabled={loading || otp.length !== 6}
              className={`w-full bg-luxe text-white rounded-lg py-3 font-medium hover:bg-luxe-dark transition duration-300 ${
                loading || otp.length !== 6
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleResendOtp}
                className="flex-1 text-luxe border border-luxe rounded-lg py-2 hover:bg-luxe hover:text-white transition duration-300"
              >
                Resend OTP
              </button>
              <button
                type="button"
                onClick={handleBackToSignup}
                className="flex-1 text-gray-600 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition duration-300"
              >
                Back
              </button>
            </div>
          </div>
        </>
      ) : (
        // Login/Signup Form Section
        <>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">
              {loginType === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-600 mt-2">
              {loginType === "login"
                ? "Sign in to your account to continue"
                : "Sign up to start your shopping journey"}
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 w-80">
            {loginType !== "login" && (
              <div>
                <label
                  htmlFor="name"
                  className="text-sm text-gray-600 block mb-2"
                >
                  Full Name
                </label>
                <div className="flex items-center justify-between gap-3 border border-gray-300 rounded-lg px-3 py-2 focus-within:border-luxe transition duration-300">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="outline-none w-full"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="text-sm text-gray-600 block mb-2"
              >
                Email Address
              </label>
              <div className="flex items-center justify-between gap-3 border border-gray-300 rounded-lg px-3 py-2 focus-within:border-luxe transition duration-300">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="outline-none w-full"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
                <RiMailLine className="text-gray-400" />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm text-gray-600 block mb-2"
              >
                Password
              </label>
              <div className="flex items-center justify-between gap-3 border border-gray-300 rounded-lg px-3 py-2 focus-within:border-luxe transition duration-300">
                <input
                  type={showPassword.password ? "text" : "password"}
                  placeholder="Enter your password"
                  className="outline-none w-full"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  required
                />
                {showPassword.password ? (
                  <RiEyeLine
                    onClick={() => toggleShowPassword("password")}
                    className="cursor-pointer text-gray-400 hover:text-gray-600"
                  />
                ) : (
                  <RiEyeOffLine
                    onClick={() => toggleShowPassword("password")}
                    className="cursor-pointer text-gray-400 hover:text-gray-600"
                  />
                )}
              </div>
              {loginType === "login" && (
                <p className="flex justify-end cursor-pointer text-luxe text-xs mt-2 hover:underline">
                  Forgot Password?
                </p>
              )}
            </div>

            {loginType !== "login" && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm text-gray-600 block mb-2"
                >
                  Confirm Password
                </label>
                <div className="flex items-center justify-between gap-3 border border-gray-300 rounded-lg px-3 py-2 focus-within:border-luxe transition duration-300">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="outline-none w-full"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    required
                  />
                  {showPassword.confirm ? (
                    <RiEyeLine
                      onClick={() => toggleShowPassword("confirm")}
                      className="cursor-pointer text-gray-400 hover:text-gray-600"
                    />
                  ) : (
                    <RiEyeOffLine
                      onClick={() => toggleShowPassword("confirm")}
                      className="cursor-pointer text-gray-400 hover:text-gray-600"
                    />
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-luxe text-white rounded-lg py-3 font-medium hover:bg-luxe-dark transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? "Processing..."
                : loginType === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-gray-600">
            {loginType === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <span
              onClick={() => {
                if (!loading) {
                  setLoginType(loginType === "login" ? "signup" : "login");
                  setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  });
                }
              }}
              className="text-luxe cursor-pointer hover:underline font-medium"
            >
              {loginType === "login" ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
