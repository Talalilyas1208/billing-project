
import { useState, useRef, useEffect } from "react";

export default function Dropdown({ trigger, children, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
   
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div className="absolute left  mb-2 w-56 bg-white rounded-xl shadow-2xl ring-1 ring-black/5 z-50 p-2 space-y-2">
    {children}
        </div>
      )}
    </div>
  );
}