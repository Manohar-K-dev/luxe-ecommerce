import React, { useState } from "react";
import { addresses } from "../../assets/assets.js";

const AddressSelection = ({ onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:justify-between mb-4 md:mb-10">
        <h1 className="font-bold text-xl md:text-2xl tracking-wide">
          Saved Addresses
        </h1>
        <button className="bg-luxe text-white text-sm md:text-base px-4 py-2 rounded-lg">
          Add New Address
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {addresses.map((address, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedIndex(index);
              onSelect(address);
            }}
            className={`border px-4 py-3 md:px-6 rounded-2xl grid gap-2 md:gap-4 cursor-pointer ${
              selectedIndex === index ? "border-indigo-600 bg-indigo-50" : ""
            }`}
          >
            <div className="flex justify-between">
              <h1 className="font-semibold">{address.type}</h1>
              {address.default && (
                <span className="bg-luxe text-white px-3 py-1 rounded-lg text-xs">
                  Default
                </span>
              )}
            </div>
            <div className="text-gray-600 text-sm md:text-base grid gap-[0.1rem]">
              <span>{address.name}</span>
              <span>
                {address.door} {address.street}
              </span>
              <span>
                {address.city}, {address.pin}
              </span>
              <span>{address.country}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddressSelection;
