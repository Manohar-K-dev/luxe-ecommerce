import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="">
        <img src="/Error-pic.jpg" alt="Page Not Find" />
      </div>
      <div className="place-content-center">
        <h1 className="text-5xl font-[800]]">Oops!</h1>
        <h1 className="text-9xl">404</h1>
        <p>This Page not Available go</p>
        <NavLink to={"/"} className="text-luxe">
          Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
