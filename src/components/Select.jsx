import { Select as AntSelect } from "antd";

const Select = ({
  value,
  options = [],
  onChange,
  placeholder = "Select...",
  label,
  showSearch = false,
  popupRender,
  open,
  antUI,
  ...rest      
}) => {
  return (
  
      <AntSelect
        value={value || undefined}
        onChange={onChange}
        open={open}
        placeholder={placeholder}
        options={options}
        showSearch={showSearch}
        popupRender={popupRender} 
        style={{ width: "100%", height: 42 }}
        allowClear
        {...antUI}
        {...rest} 
      />
   
  );
};

export default Select;
