export default function Button(props) {
  const {
    variant,
    children,
    onClick,
    type,
    disabled,
    className = "",
    style,
    antUI
  } = props;

  const variants = {
    default: "bg-black-600 text-white",
    addbutton: "bg-transparent hover:bg-gray-100 text-gray  rounded-md p-2",
  };
  const variantClass = variants[variant] || variants.default;

  return (
    <Button
      className={`p-2.5 rounded-lg transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center ${variantClass} ${className} ${antUI}`} 
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      {...style}
 
    >
      {children}
    </Button>
  );
}
