import React, { useState } from "react";
import { addresses } from "../../assets/assets.js";

const AddressSelection = ({ onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <>
      <div className="flex justify-between mb-10">
        <h1 className="font-bold text-2xl tracking-wide">Saved Addresses</h1>
        <button className="bg-luxe text-white px-4 py-2 rounded-lg">
          Add New Address
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {addresses.map((address, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedIndex(index);
              onSelect(address);
            }}
            className={`border px-6 py-3 rounded-2xl grid gap-4 cursor-pointer ${
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
            <div className="text-gray-600 grid gap-[0.1rem]">
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
