import { InputNumber as AntInputNumber } from "antd";

export default function Numbersinput(props) {
  const {
    label,
    name,
    value,
    onChange,
    placeholder,
    size = "large",
  
    precision = 2,
    showControls = false,
    width = "100%",
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
    <div className="flex flex-col" style={{ width }}>
      {label && <label className="text-gray-400">{label}</label>}

      <AntInputNumber
        className="shadow-md rounded-md w-full"
        name={name}
        value={value}
        placeholder={placeholder}
        size={size}
        controls={showControls}
        precision={precision}
      
        onChange={handleChange}
      />
    </div>
  );
}