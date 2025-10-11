import React, { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  RiUserLine,
  RiMenuLine,
  RiCloseLine,
  RiSearchLine,
  RiHeartLine,
  RiShoppingCartLine,
} from "react-icons/ri";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { totalQuantity, isAuthenticated, user } = useContext(ShopContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/all-Products?search=${encodeURIComponent(search)}`);
      setSearch("");
      setOpenMenu(false);
    }
  };

  const handleProfileClick = () => {
    navigate("/my-account");
    setOpenMenu(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
    setOpenMenu(false);
  };

  const handleWishlistClick = () => {
    navigate("/liked-products");
    setOpenMenu(false);
  };

  return (
    <div className="flex gap-2 justify-between items-center p-[0.1rem_1rem] md:p-[0.1rem_2rem] bg-white border-b-[1px] border-b-gray-300 sticky top-0 z-10">
      {/* Logo */}
      <h1
        className="text-luxe font-luxe text-[0.9rem] sm:text-[1.2rem] md:text-2xl cursor-pointer"
        onClick={() => navigate("/")}
        title="LUXE - make yours Luxury"
      >
        LUXE
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 md:gap-4 border border-gray-300 h-full rounded-[10px] p-[5px_10px] md:p-[10px_15px] w-[60%] md:w-[40%] place-items-center text-[0.9rem] hover:border-gray-400 transition duration-300"
      >
        <RiSearchLine className="text-[1.2rem] text-gray-500" />
        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-full text-[0.8rem] sm:text-[0.9rem] border-none outline-none text-gray-800 bg-transparent"
        />
      </form>

      {/* Desktop Icons */}
      <div className="hidden sm:flex sm:justify-between md:justify-around md:text-[1.3rem] w-[5rem] md:w-[10rem]">
        <RiUserLine
          className="cursor-pointer hover:text-luxe transition duration-300"
          onClick={handleProfileClick}
          title={isAuthenticated() ? "My Account" : "Login"}
        />
        <RiHeartLine
          className="cursor-pointer hover:text-luxe transition duration-300"
          onClick={handleWishlistClick}
          title="Wishlist"
        />
        <div
          className="relative cursor-pointer hover:text-luxe transition duration-300"
          onClick={handleCartClick}
          title="Cart"
        >
          <RiShoppingCartLine />
          <span
            className={`${
              totalQuantity === 0
                ? "hidden"
                : "absolute -top-3 -right-3 bg-amber-600 text-white font-bold rounded-full flex items-center justify-center text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px] animate-pulse"
            }`}
          >
            {totalQuantity > 9 ? "9+" : totalQuantity}
          </span>
        </div>
      </div>

      {/* Mobile Menu */}
      {!openMenu ? (
        <RiMenuLine
          className="sm:hidden z-50 cursor-pointer text-2xl"
          onClick={() => setOpenMenu(true)}
        />
      ) : (
        <RiCloseLine
          className="sm:hidden z-50 text-red-700 text-2xl cursor-pointer"
          onClick={() => setOpenMenu(false)}
        />
      )}

      {/* Mobile Menu Content */}
      {openMenu && (
        <div className="z-40 fixed top-0 right-0 h-full w-[70vw] transform transition-transform duration-300 translate-x-0">
          <div className="flex flex-col gap-6 px-6 py-20 bg-gray-900 h-full w-full text-white overflow-y-auto">
            {/* User Info */}
            {isAuthenticated() && user && (
              <div className="pb-4 border-b border-gray-700">
                <p className="text-sm text-gray-400">Welcome back,</p>
                <p className="font-semibold text-luxe">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="space-y-4">
              <div
                className="flex gap-4 items-center w-full px-3 py-3 cursor-pointer bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300"
                onClick={handleProfileClick}
              >
                <RiUserLine className="text-xl" />
                <h2 className="font-medium">
                  {isAuthenticated() ? "My Account" : "Login / Sign Up"}
                </h2>
              </div>
              <div
                className="flex gap-4 items-center w-full px-3 py-3 cursor-pointer bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300"
                onClick={handleWishlistClick}
              >
                <RiHeartLine className="text-xl" />
                <h2 className="font-medium">Wishlist</h2>
              </div>
              <div
                className="flex gap-4 items-center w-full px-3 py-3 cursor-pointer bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 relative"
                onClick={handleCartClick}
              >
                <RiShoppingCartLine className="text-xl" />
                <h2 className="font-medium">Cart</h2>
                {totalQuantity > 0 && (
                  <span className="absolute right-4 bg-luxe text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {totalQuantity > 9 ? "9+" : totalQuantity}
                  </span>
                )}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="pt-4 border-t border-gray-700">
              <h3 className="text-gray-400 text-sm font-semibold mb-4">
                SHOP BY CATEGORY
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <NavLink
                    to="/"
                    onClick={() => setOpenMenu(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition duration-300 ${
                        isActive ? "bg-luxe text-white" : "hover:bg-gray-800"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/all-Products"
                    onClick={() => setOpenMenu(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition duration-300 ${
                        isActive ? "bg-luxe text-white" : "hover:bg-gray-800"
                      }`
                    }
                  >
                    All Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Women"
                    onClick={() => setOpenMenu(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition duration-300 ${
                        isActive ? "bg-luxe text-white" : "hover:bg-gray-800"
                      }`
                    }
                  >
                    Women
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Men"
                    onClick={() => setOpenMenu(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition duration-300 ${
                        isActive ? "bg-luxe text-white" : "hover:bg-gray-800"
                      }`
                    }
                  >
                    Men
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Kids"
                    onClick={() => setOpenMenu(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition duration-300 ${
                        isActive ? "bg-luxe text-white" : "hover:bg-gray-800"
                      }`
                    }
                  >
                    Kids
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Accessories"
                    onClick={() => setOpenMenu(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition duration-300 ${
                        isActive ? "bg-luxe text-white" : "hover:bg-gray-800"
                      }`
                    }
                  >
                    Accessories
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Search in Mobile Menu */}
            <div className="pt-4 border-t border-gray-700">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-luxe"
                />
                <button
                  type="submit"
                  className="bg-luxe text-white p-2 rounded-lg hover:bg-luxe-dark transition duration-300"
                >
                  <RiSearchLine className="text-lg" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
