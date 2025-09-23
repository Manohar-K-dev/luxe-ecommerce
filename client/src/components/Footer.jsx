import React from "react";
import { useNavigate } from "react-router-dom";
// icons
import { FaPaypal, FaApple } from "react-icons/fa";
import {
  RiVisaFill,
  RiMastercardFill,
  RiFacebookFill,
  RiInstagramLine,
  RiTwitterXLine,
  RiPinterestLine,
} from "react-icons/ri";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Lap View */}
      <footer className="bg-gray-900 text-gray-400 px-8 py-4 xs:py-6 ss:px-12 ss:py-10 sm:px-16 sm:py-12 lg:px-28 xl:px-40 xl:py-20 overflow-hidden">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-8 border-b border-b-gray-700 mb-10 pb-10">
          <div className="flex justify-between md:flex-col gap-8">
            <h1
              className="text-white font-luxe text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] cursor-pointer"
              onClick={() => navigate("/")}
            >
              Luxe
            </h1>
            <p className="hidden md:block">
              Premium fashion for the modern lifestyle. Discover luxury clothing
              and accessories that define your style.
            </p>
            <div className="flex items-center text-xs md:text-lg gap-2 md:gap-5 text-white">
              <a
                href="/"
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full cursor-pointer"
              >
                <RiFacebookFill />
              </a>
              <a
                href="/"
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full cursor-pointer"
              >
                <RiInstagramLine />
              </a>
              <a
                href=""
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full cursor-pointer"
              >
                <RiTwitterXLine />
              </a>
              <a
                href=""
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full cursor-pointer"
              >
                <RiPinterestLine />
              </a>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-8">
            <h2 className="text-white text-xl font-semibold">Shop</h2>
            <div className="flex flex-col gap-4">
              <p className="cursor-pointer">Women</p>
              <p className="cursor-pointer">Men</p>
              <p className="cursor-pointer">Kids</p>
              <p className="cursor-pointer">Accessories</p>
              <p className="cursor-pointer">Others</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-8">
            <h2 className="text-white text-xl font-semibold">
              Customer Service
            </h2>
            <div className="flex flex-wrap md:flex-col gap-4">
              <p className="cursor-pointer">Contact Us</p>
              <p className="cursor-pointer">Size Guide</p>
              <p className="cursor-pointer">Shipping Info</p>
              <p className="cursor-pointer">Returns</p>
              <p className="cursor-pointer">FAQ</p>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="text-white text-xl font-semibold">Newsletter</h2>
            <p>
              Subscribe to get updates on new arrivals and exclusive offers.
            </p>
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                placeholder="Your Email"
                className="bg-gray-800 border border-gray-700 rounded-lg p-3"
              />
              <button
                type="submit"
                className="text-white bg-luxe px-4 py-2 rounded-lg"
              >
                Subscribe
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-white font-semibold">We Accept</h2>
              <div className="flex items-center text-2xl gap-5">
                <RiVisaFill className="text-blue-400" />
                <RiMastercardFill className="text-red-400" />
                <FaPaypal className="text-blue-400" />
                <FaApple className="text-gray-300" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-between text-sm gap-4 sm:gap-0">
          <p>© 2025 LUXE. All rights reserved.</p>
          <div className="flex text-xs sm:text-sm justify-between gap-4 text-center">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookie-policy">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
