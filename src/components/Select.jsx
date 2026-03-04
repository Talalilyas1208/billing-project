const Select = ({ value, options, onChange, placeholder = "Select...", name, width = "100%" }) => {
  return (
    <div className="select-group" style={{ marginTop: '25px', width: width, position: 'relative' }}>
      <select
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[42px] pl-3 pr-10 rounded-md border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none bg-white transition-all cursor-pointer appearance-none" 
       
      >
           {options?.map ((opt) => (
   <option value="">{opt.value}</option>
           ))}
     
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};
export default Select