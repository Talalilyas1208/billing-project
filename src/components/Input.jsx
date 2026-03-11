import { Input as AntInput } from "antd";

export default function Input(props) {
  const {
    type = "text",
    placeholder,
    value,
    name,
    onChange,
    label,
   antUI,
    className = "",
    style = {},
  } = props;
  const InputComponent =
    type === "password" ? AntInput.Password : AntInput;
  return (
    <div >
      {label && <label className={className}>{label}</label>}

      <InputComponent
        className={{...className}}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        style={{ ...style }}
        {...antUI }
        onChange={onChange}
      />
    </div>
  );
}