import { Input as AntInput, InputNumber } from "antd";

export default function Input(props) {
  const {
    type = "text",
    placeholder,
    value,
    name,
    onChange,
    label,
    size = "large",
    multiline = false,
    rows = 1,
    showControls = false,
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
  let multilines = {};

  if (multiline) {
    InputComponent = AntInput.TextArea;
    multilines = { autoSize: { minRows: rows, maxRows: maxRows } };
  } else if (type === "password") {
    InputComponent = AntInput.Password;
  } else if (type === "number") {
    InputComponent = InputNumber;

    multilines = { controls: showControls, precision: 2 };
  } else if (type === "unitnumber") {
    InputComponent = InputNumber;

    multiline = { controls: showControls, precision: 0 };
  } else {
    InputComponent = AntInput;
  }

  return (
    <div className="flex flex-col " style={{width:"100%"}}>
      {label && <label className="text-gray-400">{label}</label>}

      <InputComponent
        className="shadow-md rounded-md  w-full"
        {...(type !== "number" && type !== "unitnumber" ? { type } : {})}
        name={name}
        value={value}
         style={{ width: "100%" }}
        placeholder={placeholder}
        size={size}
        onChange={
          type === "number" || type === "unitnumber" ? handleNumberChange: onChange}
        {...multilines}
      />
    </div>
  );
}
