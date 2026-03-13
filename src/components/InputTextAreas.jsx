import { Input } from "antd";
// for description
export default function InputTextAreas(props) {
  const {
    placeholder,
    value,
    name,
    onChange,
    label,
    antUI = {},
    style,
    className
  } = props;
  const { minRows, maxRows, ...AntUI } = antUI;
  return (
    <>
      {label && <label className={className}>{label}</label>}
      <Input.TextArea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoSize={{minRows,maxRows }}
        style={{...style}}
        {...AntUI}
      />
    </>
  );
}
 
