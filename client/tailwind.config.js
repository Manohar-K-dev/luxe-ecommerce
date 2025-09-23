/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
  },
  plugins: [],
};
