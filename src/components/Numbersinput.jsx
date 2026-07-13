import { InputNumber as AntInputNumber } from "antd";
export default function Numbersinput(props) {
  const {
    label,
    name,
    value,
    onChange,
    placeholder,
    antUI = { size: "large" },
    showControls = false,
    style,
    className,
  } = props;

  const handleChange = (newValue) => {
    if (onChange) {
      onChange({ target: { name, value: newValue } });
    }
  };

  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <AntInputNumber
        style={{ width: "100%", ...style }}   
        className={className}                 
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
