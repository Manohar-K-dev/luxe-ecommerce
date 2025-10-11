import React, { useState } from "react";
import { LuSave, LuBell, LuShield, LuStore, LuMail } from "react-icons/lu";

const Settings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    storeName: "LUXE",
    storeDescription:
      "Premium fashion and lifestyle store offering high-quality clothing and accessories for modern individuals.",
    storeEmail: "store@luxe.example.com",

    // Notification Settings
    emailNotifications: true,
    orderAlerts: true,
    inventoryAlerts: false,
    marketingEmails: true,

    // Security Settings
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [activeSection, setActiveSection] = useState("general");

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
  };

  const sections = [
    { id: "general", label: "General", icon: <LuStore className="w-4 h-4" /> },
    {
      id: "notifications",
      label: "Notifications",
      icon: <LuBell className="w-4 h-4" />,
    },
    {
      id: "security",
      label: "Security",
      icon: <LuShield className="w-4 h-4" />,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Settings
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Manage your store settings and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Sidebar Navigation - Mobile Dropdown / Desktop Sidebar */}
        <div className="lg:w-64">
          {/* Mobile Dropdown */}
          <div className="lg:hidden">
            <select
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.label}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                    activeSection === section.id
                      ? "bg-luxe text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                >
                  {section.icon}
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* General Settings */}
          {activeSection === "general" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <LuStore className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    General Settings
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Manage your store's basic information
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Store Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={settings.storeName}
                    onChange={(e) =>
                      handleInputChange("storeName", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent transition-colors duration-200"
                    placeholder="Enter store name"
                  />
                </div>

                {/* Store Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Description
                  </label>
                  <textarea
                    value={settings.storeDescription}
                    onChange={(e) =>
                      handleInputChange("storeDescription", e.target.value)
                    }
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Brief description of your store"
                  />
                </div>

                {/* Store Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Email
                  </label>
                  <div className="flex items-center gap-3">
                    <LuMail className="w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={settings.storeEmail}
                      onChange={(e) =>
                        handleInputChange("storeEmail", e.target.value)
                      }
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent transition-colors duration-200"
                      placeholder="store@example.com"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSaveChanges}
                    className="flex items-center gap-2 bg-luxe text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium"
                  >
                    <LuSave className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeSection === "notifications" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <LuBell className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Notifications
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Configure how you receive notifications
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Receive email updates about new orders
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) =>
                          handleInputChange(
                            "emailNotifications",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-luxe"></div>
                    </label>
                  </div>
                </div>

                {/* Order Alerts */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Order Alerts
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Get notified when new orders are placed
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.orderAlerts}
                        onChange={(e) =>
                          handleInputChange("orderAlerts", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-luxe"></div>
                    </label>
                  </div>
                </div>

                {/* Inventory Alerts */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Inventory Alerts
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Alerts when products are low in stock
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.inventoryAlerts}
                        onChange={(e) =>
                          handleInputChange("inventoryAlerts", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-luxe"></div>
                    </label>
                  </div>
                </div>

                {/* Marketing Emails */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Marketing Emails
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Receive updates about promotions and new products
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.marketingEmails}
                        onChange={(e) =>
                          handleInputChange("marketingEmails", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-luxe"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeSection === "security" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <LuShield className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Security
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Manage your account security settings
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={settings.currentPassword}
                    onChange={(e) =>
                      handleInputChange("currentPassword", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent transition-colors duration-200"
                    placeholder="Enter current password"
                  />
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={settings.newPassword}
                    onChange={(e) =>
                      handleInputChange("newPassword", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent transition-colors duration-200"
                    placeholder="Enter new password"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={settings.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent transition-colors duration-200"
                    placeholder="Confirm new password"
                  />
                </div>

                {/* Update Password Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSaveChanges}
                    className="flex items-center gap-2 bg-luxe text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium"
                  >
                    <LuSave className="w-4 h-4" />
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
