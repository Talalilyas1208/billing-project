import { Input as AntInput } from "antd";

export default function Input(props) {
  const {
    type = "text",
    placeholder,
    value,
    name,
    onChange,
    label,
   antUI,
    className = "",
    style = {},
  } = props;
  const InputComponent =
    type === "password" ? AntInput.Password : AntInput;
    const arr = [2, 2, 2, 7, 7, 2, 2, 3];

function count(arr) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        let found = false;

        for (let j = 0; j < result.length; j++) {
            if (result[j][0] === arr[i]) {
                result[j].push(arr[i]);
                found = true;  // mark as found, inner loop keeps running but does nothing
            }
        }

        if (!found) {
            result.push([arr[i]]);
        }
    }

    return result;
}

console.log(count(arr));
// Output: [ [2,2,2,2,2], [7,7], [3] ]
  return (
    <div >
      {label && <label className={className}>{label}</label>}

      <InputComponent
        className={{...className}}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        style={{ ...style }}
        {...antUI }
        onChange={onChange}
      />
    </div>
    
  );
}