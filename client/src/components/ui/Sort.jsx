import React, { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const Sort = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState("relevance");
  const dropdownRef = useRef(null);

  const options = [
    { value: "relevance", label: "Relevance" },
    { value: "price_low_high", label: "Price: Low to High" },
    { value: "price_high_low", label: "Price: High to Low" },
    { value: "newest", label: "Newest Arrivals" },
    { value: "best_sellers", label: "Best Sellers" },
  ];

  const currentLabel = options.find((o) => o.value === sort)?.label;

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (value) => {
    setSort(value);
    setIsOpen(false);
    if (onSortChange) onSortChange(value);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <p className="text-gray-600 text-sm">Sort by:</p>
      <div ref={dropdownRef} className="relative">
        <div
          className="flex items-center justify-between text-sm p-2 md:w-[12rem] border rounded-lg cursor-pointer"
          onClick={toggleDropdown}
        >
          <h2 className="truncate">{currentLabel}</h2>
          <span className="text-lg">
            {isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
          </span>
        </div>

        {isOpen && (
          <div className="absolute top-11 left-0 right-0 border bg-white shadow-md rounded-lg p-2 text-sm z-20">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`p-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                  sort === option.value ? "bg-gray-50 font-medium" : ""
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sort;
