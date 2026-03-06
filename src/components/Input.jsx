
import { Input as AntInput, InputNumber } from "antd";

export default function Input(props) {
  const {
    type = "text",
    placeholder,
    value,
    name,
    onChange,
    label,
    size,
    multiline = false,
    rows = 1,

    maxRows = 1,
  } = props;


  const handleNumberChange = (newValue) => {
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: newValue,
        },
      });
    }
  };

  let InputComponent;
  if (multiline) {
    InputComponent = AntInput.TextArea;
  } else if (type === "password") {
    InputComponent = AntInput.Password;
  } else if (type === "number") {
    InputComponent = InputNumber;
  } else {
    InputComponent = AntInput;
  }

  return (
    <div className="flex flex-col">
      {label && <label className="text-gray-400">{label}</label>}

  <InputComponent
  {...(type !== "number" ? { type } : {})}
  name={name}
  value={value}
  placeholder={placeholder}
  size={size}
  style={{ width: "100%" }}
  onChange={type === "number" ? handleNumberChange : onChange}
  {...(type === "number"
    ? { precision: 2, }
    : {})}
  {...(multiline
    ? { autoSize: { minRows: rows, maxRows: maxRows } }
    : {})}
/>
    </div>
  );
}