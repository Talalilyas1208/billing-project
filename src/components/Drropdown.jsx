import { useRef, useEffect } from "react";

export default function Dropdown({ trigger, children, className = "", variant = "sidebar", isOpen, onToggle }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
   
      if (variant === "popover" && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [variant, onToggle]);

  const menuStyles = variant === "sidebar"
    ? "relative w-full mt-1" 
    : "absolute bottom-full left-0 mb-2 w-56 bg-white rounded-xl shadow-2xl ring-1 ring-black/5 z-50 p-2 space-y-2";

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
 
      <div onClick={() => onToggle(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div className={menuStyles}>
          {children}
        </div>
      )}
    </div>
  );
}