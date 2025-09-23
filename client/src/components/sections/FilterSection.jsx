import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const FilterSection = ({
  title,
  options,
  selectedFilters,
  setSelectedFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleChange = (option) => {
    const current = selectedFilters[title] || [];
    const newValues = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];

    setSelectedFilters({ ...selectedFilters, [title]: newValues });
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between cursor-pointer"
        onClick={toggleDropdown}
      >
        <h2>{title}</h2>
        <div className="text-lg place-content-center">
          {isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-4 mt-4 text-sm text-gray-600">
          {options.map((option, index) => (
            <p key={index} className="flex gap-2">
              <input
                type="checkbox"
                className="cursor-pointer"
                onChange={() => handleChange(option)}
              />
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
