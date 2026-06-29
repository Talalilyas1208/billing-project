import { Select as AntSelect } from "antd";

const Select = ({
  value,
  options = [],
  onChange,
  placeholder = "Select...",
  label,
  showSearch = false,
  popupRender,
  ...rest      
}) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-gray-400 ">{label}</label>}
      <AntSelect
        value={value || undefined}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        showSearch={showSearch}
        popupRender={popupRender} 
        style={{ width: "100%", height: 42 }}
        allowClear
        {...rest} 
      />
    </div>
  );
};

export default Select;
