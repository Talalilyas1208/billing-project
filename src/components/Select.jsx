import { Select as AntSelect } from "antd";

const Select = ({
  value,
  options = [],
  onChange,
  placeholder = "Select...",
  label,
  showSearch = false,
  popupRender,
  open,
  antUI,
  style,
  ...rest
}) => {
  const normalizedValue = value === null || value === undefined || value === "" ? undefined : value;

  const resolvedValue = (() => {
    if (normalizedValue === undefined) {
      return undefined;
    }

    const searchValue = String(normalizedValue).trim().toLowerCase();

    const matchedOption = options.find((option) => {
      if (!option) return false;

      const optionValue = option.value;
      const optionLabel = option.label;
      const optionValueText = optionValue == null ? "" : String(optionValue).trim().toLowerCase();
      const optionLabelText = optionLabel == null ? "" : String(optionLabel).trim().toLowerCase();

      return optionValueText === searchValue || optionLabelText === searchValue;
    });

    return matchedOption ? matchedOption.value : normalizedValue;
  })();

  return (
    <AntSelect
      value={resolvedValue}
      onChange={onChange}
      open={open}
      placeholder={placeholder}
      options={options}
      showSearch={showSearch}
      popupRender={popupRender}
      allowClear
      optionFilterProp={showSearch ? "label" : undefined}
      {...antUI}
      {...rest}
      style={{ width: "100%", height: 42, ...style }}
    />
  );
};

export default Select;
