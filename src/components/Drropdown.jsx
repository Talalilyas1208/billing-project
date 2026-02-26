import { useState, useRef, useEffect } from "react";

export default function Dropdown({
  options = [],
  placeholder = "Select...",
  onChange,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative w-60 ${className}`}
    >

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 px-4 py-2 rounded-md text-left flex justify-between items-center hover:border-blue-500 focus:outline-none"
      >
        <span>{selected || placeholder}</span>
        <span className="text-sm">▼</span>
      </button>


      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-50"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}