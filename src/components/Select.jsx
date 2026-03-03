import React from 'react';

const Select = ({ value, options, onChange, placeholder = "Select...", name, width = "100%" }) => {

  return (
    <div className="select-group" style={{ marginTop: '25px', width: width }}>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[42px] px-3 rounded-md border border-gray-300 focus:border-black focus:ring-1   hover:ring-1 hover:ring-black focus:ring-black outline-none bg-white transition-all "
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;