export default function Button(props) {
  const {
    variant,
    children,
    onClick,
    type,
    disabled,
    className = "",
    style,
  } = props;

  const variants = {
    login: "w-full bg-green-600 hover:bg-green-700 text-white justify-center",

    google:
      "w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 justify-center gap-2",

    signout:
      "bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition font-medium",
    nav: "bg-transparent text-gray-700 hover:bg-neutral-200 justify-start font-medium pl-4 pr-35 ",

    profile:
      "bg-white border border-neutral-200 text-gray-700 hover:bg-neutral-50 shadow-sm",

    default: "bg-green-600 text-white",

    product: "bg-black text-white py-3 px-6 rounded",

    modal: "bg-transparent text-gray-500 hover:bg-gray-100 p-2 rounded-md",
    addbutton: "bg-transparent hover:bg-gray-100 text-gray  rounded-md p-2",
  };
  const variantClass = variants[variant] || variants.default;

  return (
    <button
      className={`p-2.5 rounded-lg transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center ${variantClass} ${className}`}
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      {...style}
    >
      {children}
    </button>
  );
}
