import React from "react";

const SizeSelector = ({ sizes, selectedSize, setSelectedSize }) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-medium">Size</p>
      <div className="flex gap-3 text-lg">
        {sizes.map((size, index) => (
          <p
            key={index}
            onClick={() => setSelectedSize(size)}
            className={`border cursor-pointer select-none rounded-lg transition w-12 h-10 text-center place-content-center ${
              selectedSize === size
                ? "bg-luxe shadow-md font-semibold text-white"
                : "md:hover:border-luxe md:hover:border-2"
            }`}
          >
            {size}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
