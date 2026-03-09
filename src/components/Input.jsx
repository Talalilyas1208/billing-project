import { Input as AntInput } from "antd";

export default function Input(props) {
  const {
    type = "text",
    placeholder,
    value,
    name,
    onChange,
    label,
    size = "large",
    style = {},
  } = props;

  const InputComponent =
    type === "password" ? AntInput.Password : AntInput;

  return (
    <div className="flex flex-col" style={{ width: "100%" }}>
      {label && <label className="text-gray-400">{label}</label>}

      <InputComponent
        className="shadow-md rounded-md w-full"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        size={size}
        style={{ width: "100%", ...style }}
        onChange={onChange}
      />
    </div>
  );
}