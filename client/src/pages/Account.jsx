import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// icons
import {
  RiUserLine,
  RiShoppingBagLine,
  RiHeartLine,
  RiMapPinLine,
  RiSettingsLine,
} from "react-icons/ri";

// sections
import Profile from "../components/sections/Profile.jsx";
import Orders from "../components/sections/Orders.jsx";
import Wishlist from "../components/sections/Wishlist.jsx";
import Address from "../components/sections/Address.jsx";
import Settings from "../components/sections/Settings.jsx";

// main code
const Account = () => {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(() => {
    return (
      location.state?.activeTab ||
      sessionStorage.getItem("activeTab") ||
      "profile"
    );
  });

  // save tab to sessionStorage when changed
  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  // when leaving Account page, reset to profile
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("activeTab");
    };
  }, []);

  // HTML Codes
  return (
    <>
      <section className="grid gap-4 md:gap-8 w-full px-4 py-4 sm:px-6 md:px-12 lg:px-20 xl:px-40">
        <h1 className="text-2xl md:text-3xl font-extrabold">My Account</h1>
        <div className="grid md:grid-cols-[0.5fr_1.6fr] gap-4 md:gap-8">
          <div className="flex flex-col items-center gap-4 md:px-6 md:py-6 md:rounded-2xl h-fit md:shadow">
            <div className="flex md:flex-col items-center gap-4">
              <div className="p-4 md:p-7 bg-luxe w-fit rounded-full text-xl md:text-2xl text-white">
                <RiUserLine />
              </div>
              <div className="place-items-center">
                <h1 className="font-bold">Jessica Parker</h1>
                <p className="text-gray-600 text-sm">
                  jessica.parker@email.com
                </p>
              </div>
            </div>
            <div className="md:w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 md:gap-1 text-xs md:text-base mt-2">
              <div
                className={`flex gap-4 place-items-center cursor-pointer md:hover:bg-gray-100 p-3 rounded-lg ${
                  activeTab === "profile" ? "bg-gray-50" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <RiUserLine />
                <h1>Profile</h1>
              </div>
              <div
                className={`flex gap-4 place-items-center cursor-pointer md:hover:bg-gray-100 p-3 rounded-lg ${
                  activeTab === "orders" ? "bg-gray-50" : ""
                }`}
                onClick={() => setActiveTab("orders")}
              >
                <RiShoppingBagLine />
                <h1>Orders</h1>
              </div>
              {/* <div
                className={`flex gap-4 place-items-center cursor-pointer md:hover:bg-gray-100 p-3 rounded-lg ${
                  activeTab === "wishlist" ? "bg-gray-50" : ""
                }`}
                onClick={() => setActiveTab("wishlist")}
              >
                <RiHeartLine />
                <h1>Wishlist</h1>
              </div> */}
              <div
                className={`flex gap-4 place-items-center cursor-pointer md:hover:bg-gray-100 p-3 rounded-lg ${
                  activeTab === "addresses" ? "bg-gray-50" : ""
                }`}
                onClick={() => setActiveTab("addresses")}
              >
                <RiMapPinLine />
                <h1>Addresses</h1>
              </div>
              <div
                className={`flex gap-4 place-items-center cursor-pointer md:hover:bg-gray-100 p-3 rounded-lg ${
                  activeTab === "settings" ? "bg-gray-50" : ""
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <RiSettingsLine />
                <h1>Settings</h1>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 md:px-10 md:py-6 rounded-2xl shadow">
            {activeTab === "profile" ? <Profile /> : ""}
            {activeTab === "orders" ? <Orders /> : ""}
            {/* {activeTab === "wishlist" ? <Wishlist /> : ""} */}
            {activeTab === "addresses" ? <Address /> : ""}
            {activeTab === "settings" ? <Settings /> : ""}
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
