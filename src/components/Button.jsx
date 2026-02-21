export default function Button(props) {

  const { variant, children, onClick, type, disabled } = props;

  const variants = {
    login: "bg-green-600 hover:bg-green-700 text-white",
    register: "bg-red-600 hover:bg-red-700 text-white",
    google: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2",
    signout: "bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-50",
    facebook:"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-",
    default: "bg-green-600 hover:bg-green-700 text-white",
  };
  const variantClass = variants[variant] || variants.default;
  return (
    <button
      className={`w-full p-3 rounded-lg font-bold transition active:scale-95 disabled:opacity-50 ${variantClass}`}
      type={type || "button"} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}