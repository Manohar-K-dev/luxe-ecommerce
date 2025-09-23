import React, { useContext, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { ShopContext } from "../../context/CreateContext.js";
import FilterSection from "../sections/FilterSection.jsx";

const Filter = ({ selectedFilters, setSelectedFilters }) => {
  const { currency } = useContext(ShopContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // All Filters Data
  const filters = [
    {
      title: "Price Range",
      option: [
        `Under ${currency}50`,
        `${currency}50 to ${currency}100`,
        `${currency}100 to ${currency}200`,
        `${currency}200 to ${currency}300`,
        `${currency}300 & More`,
      ],
    },
    { title: "Category", option: ["Clothes", "Bags", "Shoes", "Others"] },
    {
      title: "Colors",
      option: ["Black", "White", "Red", "Green", "Blue", "Gray"],
    },
    { title: "Sizes", option: ["XS", "S", "M", "L", "XL"] },
  ];

  return (
    <div className="border rounded-xl p-4 sm:p-6 bg-white">
      {/* ✅ Mobile Header (Collapsible) */}
      <div
        className="flex justify-between items-center cursor-pointer sm:hidden"
        onClick={toggleDropdown}
      >
        <h1 className="font-bold">Filters</h1>
        <div className="text-lg">
          {isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </div>
      </div>

      {/* ✅ Mobile Collapsible & Desktop Always Open */}
      <div
        className={`flex flex-col gap-6 mt-4 ${
          !isOpen ? "hidden sm:flex" : "flex"
        }`}
      >
        <h1 className="font-bold hidden sm:block">Filters</h1>
        {filters.map((filter, index) => (
          <FilterSection
            key={index}
            title={filter.title}
            options={filter.option}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        ))}
        {/* Optional: Clear all filters button */}
        <button
          className="mt-6 p-3 text-gray-600 bg-gray-50 rounded-lg w-full"
          onClick={() => setSelectedFilters({})}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
