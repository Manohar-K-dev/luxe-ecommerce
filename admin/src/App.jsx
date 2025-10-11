import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import AdminLogin from "./pages/AdminLogin.jsx";
import Home from "./pages/Home.jsx";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""
  );
  // const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on app start
  // useEffect(() => {
  //   const token = localStorage.getItem("adminToken");
  //   if (token) {
  //     setIsAuthenticated(true);
  //   }
  //   setIsLoading(false);
  // }, []);
  useEffect(() => {
    localStorage.setItem("adminToken", token);
  }, [token]);

  // Function to handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxe"></div>
  //     </div>
  //   );
  // }

  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/admin" replace />
              ) : (
                <AdminLogin setToken={setToken} onLogin={handleLogin} />
              )
            }
          />

          {/* Admin Dashboard Route */}
          <Route
            path="/admin/*"
            element={
              token ? (
                <Home
                  token={token}
                  setToken={setToken}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Default Route - Redirect to Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch all route - Redirect to Login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
