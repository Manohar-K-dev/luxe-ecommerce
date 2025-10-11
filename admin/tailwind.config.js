/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      luxe: ["Pacifico", "cursive"],
      sec: ["Poppins", "sans-serif"],
      global: ["Inter", "sans-serif"],
    },
    colors: {
      luxe: "#1a237e",
      light: "#ffffff",
    },
    screens: {
      xs: "375px",
      ss: "460px",
    },
  },
};
export const plugins = [];