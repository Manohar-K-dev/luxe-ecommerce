import React, { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

const Theme = () => {
  const [theme, setTheme] = useState("dark");

  return <div>{theme == "light" ? <FaMoon /> : <MdSunny />}</div>;
};

export default Theme;
