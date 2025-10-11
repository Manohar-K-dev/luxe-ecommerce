// import React, { useContext, useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import Login from "./Login";

// // icons
// import {
//   RiUserLine,
//   RiShoppingBagLine,
//   RiHeartLine,
//   RiMapPinLine,
//   RiSettingsLine,
//   RiLogoutBoxRLine,
// } from "react-icons/ri";

// // sections
// import Profile from "../components/sections/Profile.jsx";
// import Orders from "../components/sections/Orders.jsx";
// // import Wishlist from "../components/sections/Wishlist.jsx";
// import Address from "../components/sections/Address.jsx";
// import Settings from "../components/sections/Settings.jsx";

// // main code
// const Account = () => {
//   const location = useLocation();
//   const { user, isAuthenticated, logout } = useContext(ShopContext);

//   const [activeTab, setActiveTab] = useState(() => {
//     return (
//       location.state?.activeTab ||
//       sessionStorage.getItem("activeTab") ||
//       "profile"
//     );
//   });

//   // save tab to sessionStorage when changed
//   useEffect(() => {
//     sessionStorage.setItem("activeTab", activeTab);
//   }, [activeTab]);

//   // when leaving Account page, reset to profile
//   useEffect(() => {
//     return () => {
//       sessionStorage.removeItem("activeTab");
//     };
//   }, []);

//   // If user is not authenticated, show login page
//   if (!isAuthenticated()) {
//     return <Login />;
//   }

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <>
//       <section className="grid gap-4 md:gap-8 w-full px-4 py-4 sm:px-6 md:px-12 lg:px-20 xl:px-40">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl md:text-3xl font-extrabold">My Account</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
//           >
//             <RiLogoutBoxRLine />
//             Logout
//           </button>
//         </div>
//         <div className="grid md:grid-cols-[0.5fr_1.6fr] gap-4 md:gap-8">
//           <div className="flex flex-col items-center gap-4 md:px-6 md:py-6 md:rounded-2xl h-fit md:shadow">
//             <div className="flex md:flex-col items-center gap-4">
//               <div className="p-4 md:p-7 bg-luxe w-fit rounded-full text-xl md:text-2xl text-white">
//                 <RiUserLine />
//               </div>
//               <div className="place-items-center">
//                 <h1 className="font-bold">{user?.name || "User"}</h1>
//                 <p className="text-gray-600 text-sm">
//                   {user?.email || "user@email.com"}
//                 </p>
//               </div>
//             </div>
//             <div className="md:w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 md:gap-1 text-xs md:text-base mt-2">
//               <div
//                 className={`flex gap-4 place-items-center cursor-pointer md:hover:bg-gray-100 p-3 rounded-lg ${
//                   activeTab === "profile" ? "bg-gray-50" : ""
//                 }`}
//                 onClick={() => setActiveTab("profile")}
//               >
//                 <RiUserLine />
//                 <h1>Profile</h1>
//               </div>
//               <div
//                 className={`flex gap-4 place-items-center cursor-pointer md:hover:bg-gray-100 p-3 rounded-lg ${
//                   activeTab === "orders" ? "bg-gray-50" : ""
//                 }`}
//                 onClick={() => setActiveTab("orders")}
//               >
//                 <RiShoppingBagLine />
//                 <h1>Orders</h1>
//               </div>
//               {/* <div
//                 className={`flex gap-4 place-items-center cursor-pointer md:hover:bg-gray-100 p-3 rounded-lg ${
//                   activeTab === "wishlist" ? "bg-gray-50" : ""
//                 }`}
//                 onClick={() => setActiveTab("wishlist")}
//               >
//                 <RiHeartLine />
//                 <h1>Wishlist</h1>
//               </div> */}
//               <div
//                 className={`flex gap-4 place-items-center cursor-pointer md:hover:bg-gray-100 p-3 rounded-lg ${
//                   activeTab === "addresses" ? "bg-gray-50" : ""
//                 }`}
//                 onClick={() => setActiveTab("addresses")}
//               >
//                 <RiMapPinLine />
//                 <h1>Addresses</h1>
//               </div>
//               <div
//                 className={`flex gap-4 place-items-center cursor-pointer md:hover:bg-gray-100 p-3 rounded-lg ${
//                   activeTab === "settings" ? "bg-gray-50" : ""
//                 }`}
//                 onClick={() => setActiveTab("settings")}
//               >
//                 <RiSettingsLine />
//                 <h1>Settings</h1>
//               </div>
//             </div>
//           </div>
//           <div className="px-4 py-3 md:px-10 md:py-6 rounded-2xl shadow">
//             {activeTab === "profile" && <Profile user={user} />}
//             {activeTab === "orders" && <Orders />}
//             {/* {activeTab === "wishlist" && <Wishlist />} */}
//             {activeTab === "addresses" && <Address />}
//             {activeTab === "settings" && <Settings />}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Account;

import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Login from "./Login";

// Icons
import {
  RiUserLine,
  RiShoppingBagLine,
  RiHeartLine,
  RiMapPinLine,
  RiSettingsLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";

// Sections
import Profile from "../components/sections/Profile.jsx";
import Orders from "../components/sections/Orders.jsx";
// import Wishlist from "../components/sections/Wishlist.jsx";
import Address from "../components/sections/Address.jsx";
import Settings from "../components/sections/Settings.jsx";

// Tab configuration for better maintainability
const TAB_CONFIG = [
  { id: "profile", label: "Profile", icon: RiUserLine, component: Profile },
  { id: "orders", label: "Orders", icon: RiShoppingBagLine, component: Orders },
  // { id: "wishlist", label: "Wishlist", icon: RiHeartLine, component: Wishlist },
  {
    id: "addresses",
    label: "Addresses",
    icon: RiMapPinLine,
    component: Address,
  },
  {
    id: "settings",
    label: "Settings",
    icon: RiSettingsLine,
    component: Settings,
  },
];

const Account = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useContext(ShopContext);

  // Initialize active tab with proper fallbacks
  const [activeTab, setActiveTab] = useState(() => {
    return (
      location.state?.activeTab ||
      sessionStorage.getItem("activeTab") ||
      "profile"
    );
  });

  // Save active tab to sessionStorage when changed
  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  // Clean up sessionStorage when component unmounts
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("activeTab");
    };
  }, []);

  // Handle logout action
  const handleLogout = () => {
    logout();
  };

  // Get the active tab component
  const ActiveTabComponent = TAB_CONFIG.find(
    (tab) => tab.id === activeTab
  )?.component;

  // If user is not authenticated, show login page
  if (!isAuthenticated()) {
    return <Login />;
  }

  return (
    <section className="grid gap-4 md:gap-8 w-full px-4 py-4 sm:px-6 md:px-12 lg:px-20 xl:px-40">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-extrabold">My Account</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          aria-label="Logout"
        >
          <RiLogoutBoxRLine />
          Logout
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-[0.5fr_1.6fr] gap-4 md:gap-8">
        {/* Sidebar Navigation */}
        <div className="flex flex-col items-center gap-4 md:px-6 md:py-6 md:rounded-2xl h-fit md:shadow">
          {/* User Info Section */}
          <div className="flex md:flex-col items-center gap-4">
            <div className="p-4 md:p-7 bg-luxe w-fit rounded-full text-xl md:text-2xl text-white">
              <RiUserLine />
            </div>
            <div className="place-items-center">
              <h1 className="font-bold">{user?.name || "User"}</h1>
              <p className="text-gray-600 text-sm">
                {user?.email || "user@email.com"}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="md:w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 md:gap-1 text-xs md:text-base mt-2">
            {TAB_CONFIG.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <div
                  key={tab.id}
                  className={`flex gap-4 place-items-center cursor-pointer md:hover:bg-gray-100 p-3 rounded-lg transition-colors ${
                    isActive ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === "Enter" && setActiveTab(tab.id)}
                >
                  <IconComponent />
                  <h1>{tab.label}</h1>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Tab Content */}
        <div className="px-4 py-3 md:px-10 md:py-6 rounded-2xl shadow">
          {ActiveTabComponent && <ActiveTabComponent user={user} />}
        </div>
      </div>
    </section>
  );
};

export default Account;
