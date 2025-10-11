import React, { useState } from "react";
import { LuMail, LuLock, LuEye, LuEyeOff, LuStore } from "react-icons/lu";
import { authAPI } from "../services/api";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const AdminLogin = ({ onLogin, setToken }) => {
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [errors, setErrors] = useState({});

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  //   // Clear error when user starts typing
  //   if (errors[name]) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       [name]: "",
  //     }));
  //   }
  // };

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.email) {
  //     newErrors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = "Email is invalid";
  //   }

  //   if (!formData.password) {
  //     newErrors.password = "Password is required";
  //   } else if (formData.password.length < 8) {
  //     newErrors.password = "Password must be at least 8 characters";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // admin/src/pages/AdminLogin.jsx - Update the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   return;
    // }

    // setIsLoading(true);

    try {
      // Real API call to your backend
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success && response.data.token) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
      // const response = await authAPI.login(formData.email, formData.password);
      // if (response.success && response.token) {
      //   // Store token in localStorage
      //   localStorage.setItem("adminToken", response.token);
      //   // Call parent login function
      //   onLogin();
      //   console.log("Login successful");
      // } else {
      //   throw new Error(response.message || "Login failed");
      // }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message);
      // alert(
      //   error.response?.data?.message ||
      //     error.message ||
      //     "Login failed. Please check your credentials."
      // );
    }
    // finally {
    //   setIsLoading(false);
    // }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Quick fill demo credentials
  // const fillDemoCredentials = (email, password) => {
  //   setFormData({ email, password });
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxe via-blue-700 to-purple-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-luxe p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <LuStore className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">LUXE</h1>
                <p className="text-blue-100 text-sm">Premium Fashion Admin</p>
              </div>
            </div>
            <p className="text-blue-100 text-sm">
              Access your store management dashboard
            </p>
          </div>

          {/* Login Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LuMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent transition-colors duration-200"
                    placeholder="admin@luxe.com"
                    required
                  />
                </div>
                {/* {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )} */}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LuLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <LuEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <LuEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {/* {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )} */}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                // disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-luxe transition-colors duration-200"
              >
                Sign in to Admin Panel
              </button>
            </form>

            {/* Admin Credentials Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Admin Access:
              </h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  Use your admin credentials configured in environment variables
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  ADMIN_EMAIL and ADMIN_PASSWORD from your .env file
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © 2024 LUXE Premium Fashion. All rights reserved.
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white text-opacity-80">
            Secure admin access • Encrypted connection
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
