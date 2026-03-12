import { Input } from "antd";

export default function MultilIneinput(props) {
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
 
