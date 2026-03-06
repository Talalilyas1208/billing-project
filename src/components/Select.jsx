import { Select as AntSelect } from "antd";

const Select = ({
  value,
  options = [],
  onChange,
  placeholder = "Select...",
 width = "",
  showSearch = false,
}) => {
  return (
    <div  className="mt-5">
      <AntSelect
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        showSearch={showSearch}
     
        style={{ width: "100%", height: 42 }}
        allowClear
      />
    </div>
  );
};

export default Select;