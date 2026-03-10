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
    <div className={ className}>
      {label && <label className={className}>{label}</label>}

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
