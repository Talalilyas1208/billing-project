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
  style,
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
      allowClear
      {...antUI}
      {...rest}
      style={{ width: "100%", height: 42, ...style }}
    />
  );
};

export default Select;
