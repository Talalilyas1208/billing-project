export default function Input(props) {
  const {
    type = "text",
    placeholder,
    value,
    label,
    size = "md",
    width = "full",
  } = props;

  const sizeStyles = {
    sm: "h-8 px-2 text-sm placeholder:text-xs",  
    md: "h-10 px-3 text-base placeholder:text-sm",
    lg: "h-12 px-4 text-lg placeholder:text-base",
    xxlg : "h-14 px-5 text-lg placeholder:text-sm"
  };

  const widthStyles = {
    xs: "w-18",
    sm: "w-32",
    md: "w-64",
    lg: "w-96",
    xxlg: "w-109",
    full: "w-full",
  };

  return (
    <div className={`flex flex-col gap-1 ${widthStyles[width]}`}>
      {label && (
        <label className="text-sm font-medium text-gray-400">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={`border border-gray-300 rounded-lg ${sizeStyles[size]} hover:ring-1 hover:ring-black
    focus:outline-none focus:ring-1 focus:ring-black`}
      />
    </div>
  );
}
