import React, { useEffect, useState } from "react";

const Toggle = ({ id, defaultValue }) => {
  const [isOn, setIsOn] = useState(() => {
    const saved = localStorage.getItem(id);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(isOn));
  }, [isOn, id]);

  return (
    <button
      className={`rounded-full w-12 h-6 flex items-center transition-colors duration-300 ${
        isOn ? "bg-luxe" : "bg-gray-600"
      }`}
      onClick={() => setIsOn(!isOn)}
    >
      <div
        className={`bg-white rounded-full w-5 h-5 mx-[2px] transform transition-transform duration-300 ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
};

export default Toggle;
