import { memo } from "react";
import { InputNumber } from "antd";

function QuantityCell({ value, onChange }) {
  return (
    <InputNumber
      style={{ width: "100%", height: 42 }}
      min={1}
      value={value || 1}
      onChange={onChange}
    />
  );
}

export default memo(QuantityCell);
