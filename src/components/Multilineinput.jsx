import { Input } from "antd";

export default function Multilinenput(props) {
  const {
    placeholder,
    value,
    name,
    onChange,
    label,
    antUI = {}
  } = props;
  return (
    <>
      {label && <label className="text-gray-400">{label}</label>}
      <Input.TextArea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoSize={{ minRows: 1, maxRows: 1 }}
        {...antUI}
      />
    </>
  );
}
