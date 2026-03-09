import { InputNumber as AntInputNumber } from "antd";

export default function Numbersinput(props) {
  const {
    label,
    name,
    value,
    onChange,
    placeholder,
    antUI = {},
    showControls = false,
    style,
    className,
  } = props;
  const handleChange = (newValue) => {
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: newValue,
        },
      });
    }
  };
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="text-gray-400">{label}</label>}

      <AntInputNumber
        style={{ ...style }}
        name={name}
        value={value}
        placeholder={placeholder}
        controls={showControls}
        onChange={handleChange}
        {...antUI}
      />
    </div>
  );
}
