export default function Button(props) {
  const {
    variant,
    children,
    onClick,
    type = "button",
    disabled,
    className = "",
    style,
    antUI = ""   
  } = props;
  const variants = {
    
    addbutton: "bg-transparent hover:bg-gray-100 text-gray-600 rounded-md p-2",
    facebook: "bg-[#1877F2] text-white", 
  };
  const variantClass = variant ? (variants[variant] || variants.default) : "";

  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`p-2.5  transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center ${variantClass} ${antUI} ${className}`} >
      {children}
    </button>
  );
}