import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="hidden sm:grid h-[50px] bg-gray-50 place-items-center">
      <ul className="flex gap-8 h-full justify-between place-items-center font-global text-[0.9rem]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `cursor-pointer hover:underline underline-offset-4 ${
              isActive ? "underline text-luxe" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/all-Products"
          className={({ isActive }) =>
            `cursor-pointer sm:hover:underline underline-offset-4 ${
              isActive ? "underline text-luxe" : ""
            }`
          }
        >
          All Products
        </NavLink>
        <NavLink
          to="/women"
          className={({ isActive }) =>
            `cursor-pointer hover:underline underline-offset-4 ${
              isActive ? "underline text-luxe" : ""
            }`
          }
        >
          Women
        </NavLink>
        <NavLink
          to="/men"
          className={({ isActive }) =>
            `cursor-pointer hover:underline underline-offset-4 ${
              isActive ? "underline text-luxe" : ""
            }`
          }
        >
          Men
        </NavLink>
        <NavLink
          to="/kids"
          className={({ isActive }) =>
            `cursor-pointer hover:underline underline-offset-4 ${
              isActive ? "underline text-luxe" : ""
            }`
          }
        >
          Kids
        </NavLink>
        <NavLink
          to="/accessories"
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
  );
};

export default Header;
