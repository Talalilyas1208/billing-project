import { Typography } from "antd";
import Select from "../Select";

const { Text } = Typography;

export default function LabeledSelectField({
  label,
  value,
  options,
  onChange,
  placeholder,
  style,
  showSearch,
  popupRender,
  open,
  antUI,
  ...rest
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Text type="secondary" style={{ display: "block", marginBottom: 4 }}>
        {label}
      </Text>
      <Select
        value={value}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        showSearch={showSearch}
        popupRender={popupRender}
        open={open}
        antUI={antUI}
        style={{ width: "100%", ...style }}
        {...rest}
      />
    </div>
  );
}
