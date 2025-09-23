import React, { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

// Icons
import {
  RiUserLine,
  RiMenuLine,
  RiCloseLine,
  RiSearchLine,
  RiHeartLine,
  RiShoppingCartLine,
} from "react-icons/ri";
// Context
// import { CartContext } from "../context/CartContext.jsx";
import { ShopContext } from "../context/CreateContext.js";

const Navbar = () => {
  const { totalQuantity } = useContext(ShopContext);
  // const { cart } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/all-Products?search=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  return (
    <div className="flex gap-2 justify-between items-center p-[0.1rem_1rem] md:p-[0.1rem_2rem] bg-white border-b-[1px] border-b-gray-300 sticky top-0 z-10">
      <h1
        className="text-luxe font-luxe text-[0.9rem] sm:text-[1.2rem] md:text-2xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        LUXE
      </h1>
      <form
        onSubmit={handleSearch}
        className="flex gap-2 md:gap-4 border border-gray-300 h-full rounded-[10px] p-[5px_10px] md:p-[10px_15px] w-[60%] md:w-[40%] place-items-center text-[0.9rem]"
      >
        <RiSearchLine className="text-[1.2rem] text-gray-500" />
        <input
          type="text"
          placeholder="Search fro products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-full text-[0.8rem] sm:text-[0.9rem] border-none outline-none text-gray-800"
        />
      </form>
      <div className="hidden sm:flex sm:justify-between md:justify-around md:text-[1.3rem] w-[5rem] md:w-[10rem]">
        <RiUserLine
          className="cursor-pointer"
          onClick={() => navigate("/my-account")}
          // onClick={() => {
          //   if (localStorage.getItem("isLoggedIn")) {
          //     navigate("/my-account");
          //   } else {
          //     navigate("/registration");
          //   }
          // }}
        />
        <RiHeartLine
          className="cursor-pointer"
          onClick={() => navigate("/liked-products")}
        />
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <RiShoppingCartLine />
          <span className=" absolute -top-3 -right-3 bg-amber-600 text-white font-bold rounded-full flex items-center justify-center text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]">
            {totalQuantity > 9 ? "9+" : totalQuantity}
            {/* {0} */}
          </span>
        </div>
      </div>
      {!openMenu ? (
        <RiMenuLine
          className="sm:hidden z-50 cursor-pointer"
          onClick={() => setOpenMenu(true)}
        />
      ) : (
        <RiCloseLine
          className="sm:hidden z-50 text-red-700 text-xl cursor-pointer"
          onClick={() => setOpenMenu(false)}
        />
      )}
      {openMenu && (
        <div
          className={`z-40 fixed top-0 right-0 h-full w-[70vw] transform transition-transform duration-300 ${
            openMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-4 px-3 py-16 bg-gray-900 h-full w-full text-white">
            <div
              className="flex gap-4 items-center w-fit px-2 cursor-pointer"
              onClick={() => {
                navigate("/my-account");
                setOpenMenu(false);
              }}
            >
              <RiUserLine />
              <h2>Profile</h2>
            </div>
            <div
              className="flex gap-4 items-center w-fit px-2 cursor-pointer"
              onClick={() => {
                navigate("/liked-products");
                setOpenMenu(false);
              }}
            >
              <RiHeartLine />
              <h2>Wishlist</h2>
            </div>
            <div
              className="flex gap-4 items-center w-fit px-2 cursor-pointer"
              onClick={() => {
                navigate("/cart");
                setOpenMenu(false);
              }}
            >
              <RiShoppingCartLine />
              <h2>Cart</h2>
            </div>
            {/*  */}
            <ul className="flex flex-col gap-4 px-3">
              <NavLink
                to="/"
                onClick={() => setOpenMenu(false)}
                className={({ isActive }) =>
                  `cursor-pointer hover:underline underline-offset-4 ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/all-Products"
                onClick={() => setOpenMenu(false)}
                className={({ isActive }) =>
                  `cursor-pointer hover:underline underline-offset-4 ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                All Products
              </NavLink>
              <NavLink
                to="/Women"
                onClick={() => setOpenMenu(false)}
                className={({ isActive }) =>
                  `cursor-pointer hover:underline underline-offset-4 ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                Women
              </NavLink>
              <NavLink
                to="/Men"
                onClick={() => setOpenMenu(false)}
                className={({ isActive }) =>
                  `cursor-pointer hover:underline underline-offset-4 ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                Men
              </NavLink>
              <NavLink
                to="/Kids"
                onClick={() => setOpenMenu(false)}
                className={({ isActive }) =>
                  `cursor-pointer hover:underline underline-offset-4 ${
                    isActive ? "underline text-luxe" : ""
                  }`
                }
              >
                Kids
              </NavLink>
              <NavLink
                to="/Accessories"
                onClick={() => setOpenMenu(false)}
                className={({ isActive }) =>
                  `cursor-pointer hover:underline underline-offset-4 ${
                    isActive ? "underline text-luxe" : ""
                  }`
                }
              >
                Accessories
              </NavLink>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
