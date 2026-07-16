import { Form } from "antd";
import Input from "../Input";
import Numbersinput from "../Numbersinput";
import Select from "../Select";


const FIELD_COMPONENTS = {
  text: Input,
  number: Numbersinput,
  select: Select,
};

export default function FormField({
  type = "text",
  name,
  label,
  required = false,
  requiredMessage = "This field is required",
  rules,
  placeholder,
  antUI = { size: "large" },
  style,
  options,
  hidden = false,
  formItemProps = {},
  ...inputProps
}) {
  const Component = FIELD_COMPONENTS[type] || Input;

  const resolvedRules =
    rules ?? (required ? [{ required: true, message: requiredMessage }] : []);

  return (
    <Form.Item
      name={name}
      label={label}
      rules={resolvedRules}
      hidden={hidden}
      {...formItemProps}
    >
      <Component
        placeholder={placeholder}
        antUI={antUI}
        style={{ width: "100%", ...style }}
        options={options}
        {...inputProps}
      />
    </Form.Item>
  );
}
