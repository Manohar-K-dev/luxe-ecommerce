import React, { useState } from "react";
import { RiMailLine, RiEyeOffLine, RiEyeLine } from "react-icons/ri";

const Login = () => {
  const [login, setLogin] = useState("login");
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="select-none flex flex-col items-center gap-8 py-16">
      <img src="/shopping-cart.png" alt="" className="w-16" />
      <p className="text-gray-600">{`Enter credentials below to ${
        login == "login" ? "Login" : "Signup"
      }`}</p>
      <form
        onSubmit={onSubmitHandler}
        action=""
        className="flex flex-col gap-4"
      >
        {login != "login" && (
          <div>
            <label htmlFor="" className="text-sm text-gray-600">
              Name
            </label>
            <div className="flex items-center justify-between gap-3 border rounded-lg px-3 py-1">
              <input
                type="text"
                placeholder="xyz"
                className="outline-none"
                required
              />
            </div>
          </div>
        )}
        <div className="">
          <label htmlFor="" className="text-sm text-gray-600">
            Email
          </label>
          <div className="flex items-center justify-between gap-3 border rounded-lg px-3 py-1">
            <input
              type="email"
              placeholder="xyz@gmail.com"
              className="outline-none"
              required
            />
            <RiMailLine />
          </div>
        </div>
        <div>
          <label htmlFor="" className="text-sm text-gray-600">
            Password
          </label>
          <div className="flex items-center justify-between gap-3 border rounded-lg px-3 py-1">
            <input
              type={showPassword.password ? "text" : "password"}
              placeholder="xyz@#$123"
              className="outline-none"
              required
            />
            {showPassword.password ? (
              <RiEyeLine
                onClick={() => toggleShowPassword("password")}
                className="cursor-pointer"
              />
            ) : (
              <RiEyeOffLine
                onClick={() => toggleShowPassword("password")}
                className="cursor-pointer"
              />
            )}
          </div>
          {login == "login" && (
            <p className="flex justify-end cursor-pointer text-luxe text-xs mt-1">
              Forget Password?
            </p>
          )}
        </div>
        {login != "login" && (
          <div>
            <label htmlFor="" className="text-sm text-gray-600">
              Confirm Password
            </label>
            <div className="flex items-center justify-between gap-3 border rounded-lg px-3 py-1">
              <input
                type={showPassword.confirm ? "text" : "password"}
                placeholder="xyz@#$123"
                className="outline-none"
                required
              />
              {showPassword.confirm ? (
                <RiEyeLine
                  onClick={() => toggleShowPassword("confirm")}
                  className="cursor-pointer"
                />
              ) : (
                <RiEyeOffLine
                  onClick={() => toggleShowPassword("confirm")}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        )}
        <button
          type="submit"
          className="bg-luxe text-white rounded-lg py-2 mt-5"
        >
          {login == "login" ? "Login" : "Sign up"}
        </button>
      </form>
      <p className="text-sm">
        {login == "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <span
          onClick={() => setLogin(login == "login" ? "signup" : "login")}
          className="text-luxe cursor-pointer"
        >
          {login == "login" ? "Sign Up" : "Log In"}
        </span>
      </p>
    </div>
  );
};

export default Login;
