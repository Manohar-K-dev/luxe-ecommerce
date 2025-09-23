import React, { useState } from "react";

const ColorSelector = ({ colors, selectedColor, setSelectedColor }) => {
  // const [selectedColor, setSelectedColor] = useState(null);

  // Tailwind-safe color mapping (you can expand this list)
  const colorMap = {
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    pink: "bg-pink-500",
    gray: "bg-gray-500",
    red: "bg-red-500",
    green: "bg-green-500",
    black: "bg-black",
    white: "bg-white border border-gray-300", // add border so it’s visible
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="font-medium">
        Color{`${selectedColor ? ":" + " " + selectedColor : ""}`}
      </p>
      <div className="flex gap-3">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => setSelectedColor(color)}
            className={`w-10 h-10 cursor-pointer place-self-center rounded-full border-2 transition ${
              selectedColor === color
                ? "border-blue-800 p-4"
                : "border-gray-200"
            } ${colorMap[color] || "bg-gray-200"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
