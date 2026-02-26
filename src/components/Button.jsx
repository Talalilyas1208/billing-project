// Button.jsx
export default function Button(props) {
  const { variant, children, onClick, type, disabled, className = "" } = props;

  const variants = {
    login: "bg-green-600 hover:bg-green-700 text-white",
    google: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2",
    // Fixed sginout typo and added nav variant
    signout: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition font-medium",
    nav: "bg-transparent text-gray-700 hover:bg-neutral-200 justify-start font-medium",
    profile: "bg-white border border-neutral-200 text-gray-700 hover:bg-neutral-50 shadow-sm",
    default: "bg-green-600 text-white",
  };

  const variantClass = variants[variant] || variants.default;

  return (
    <button
      className={`w-full p-2.5 rounded-lg transition active:scale-[0.98] disabled:opacity-50 flex items-center ${variantClass} ${className}`}
      type={type || "button"} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}