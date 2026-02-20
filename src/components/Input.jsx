export default function Input(props) {
  const { type, placeholder, name,onChange} = props;

  return (
    <input
      className="w-full p-3 border border-gray-300 rounded-lg"
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      
    />
  );
}
