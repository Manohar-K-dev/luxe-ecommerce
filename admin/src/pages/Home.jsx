import React, { useState } from "react";
// Components
import Dashboard from "../components/Dashboard.jsx";
import Products from "../components/Products.jsx";
import Orders from "../components/Orders.jsx";
import Customers from "../components/Customers.jsx";
import Analytics from "../components/Analytics.jsx";
import Settings from "../components/Settings.jsx";
// Icons
import {
  LuBell,
  LuChartColumn,
  LuLayoutDashboard,
  LuPackage,
  LuPanelLeft,
  LuSettings,
  LuShoppingCart,
  LuUser,
  LuUsers,
  LuMenu,
  LuX,
  LuLogOut,
  LuCircleUser,
} from "react-icons/lu";

const Home = ({ setToken, token }) => {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LuLayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Products",
      icon: <LuPackage className="w-5 h-5" />,
    },
    {
      name: "Orders",
      icon: <LuShoppingCart className="w-5 h-5" />,
    },
    {
      name: "Customers",
      icon: <LuUsers className="w-5 h-5" />,
    },
    {
      name: "Analytics",
      icon: <LuChartColumn className="w-5 h-5" />,
    },
    {
      name: "Settings",
      icon: <LuSettings className="w-5 h-5" />,
    },
  ];

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
    // Close mobile menu when a tab is selected
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    setToken("");
    setIsUserDropdownOpen(false);
  };

  // Close mobile menu when resizing to larger screens
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest(".user-dropdown")) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserDropdownOpen]);

  return (
    <section className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex-col ${
          isOpen ? "w-64" : "w-[90px]"
        }`}
      >
        <div className="p-6 flex-1">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1
              className={`font-bold text-xl text-gray-800 transition-all duration-300 ${
                isOpen ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              LUXE Admin
            </h1>
            <p
              className={`text-sm text-gray-500 mt-1 transition-all duration-300 ${
                isOpen ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              Premium Fashion
            </p>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleTabClick(item.name)}
                className={`flex items-center text-center w-full transition-all duration-200 md:hover:text-gray-600 md:hover:bg-gray-100 rounded-lg p-3 ${
                  selectedTab === item.name
                    ? "bg-luxe text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span
                  className={`ml-3 transition-all duration-300 font-medium ${
                    isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex-1">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-bold text-xl text-gray-800">LUXE Admin</h1>
              <p className="text-sm text-gray-500 mt-1">Premium Fashion</p>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <LuX className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleTabClick(item.name)}
                className={`flex items-center w-full transition-all duration-200 hover:bg-gray-100 rounded-lg p-3 ${
                  selectedTab === item.name
                    ? "bg-luxe text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="ml-3 font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <LuMenu className="w-5 h-5 text-gray-600" />
                </button>

                {/* Desktop Toggle Button */}
                <button
                  onClick={toggleSidebar}
                  className="hidden lg:flex cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200"
                >
                  <LuPanelLeft
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                      isOpen ? "" : "rotate-180"
                    }`}
                  />
                </button>

                {/* Breadcrumb */}
                <div className="hidden sm:block">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {selectedTab}
                  </h2>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Notifications */}
                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group">
                  <LuBell className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full"></span>
                  <span className="sr-only">Notifications</span>
                </button>

                {/* User Profile with Dropdown */}
                <div className="relative user-dropdown">
                  <button
                    onClick={toggleUserDropdown}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                  >
                    <div className="p-2 bg-luxe text-white rounded-lg transition-colors duration-200">
                      <LuUser className="w-4 h-4" />
                    </div>

                    {/* User Info - Hidden on mobile */}
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-700">Admin</p>
                      <p className="text-xs text-gray-500">LUXE Store</p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {/* User Info in Dropdown */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800">
                          Admin User
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          admin@luxe.com
                        </p>
                      </div>

                      {/* Dropdown Items */}
                      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        <LuCircleUser className="w-4 h-4 text-gray-400" />
                        Profile Settings
                      </button>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LuLogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Breadcrumb */}
            <div className="sm:hidden mt-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedTab}
              </h2>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="transition-all duration-300">
              {selectedTab === "Dashboard" && <Dashboard />}
              {selectedTab === "Products" && <Products token={token} />}
              {selectedTab === "Orders" && <Orders />}
              {selectedTab === "Customers" && <Customers />}
              {selectedTab === "Analytics" && <Analytics />}
              {selectedTab === "Settings" && <Settings />}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Home;
