import { Typography } from 'antd';
import { Input } from 'antd';
export default function Multilineinput(props) {

    
 const {
    value,
    onChange,
    placeholder,type="text"
 } = props;

    

const { TextArea } = Input;
    return (

  <>
      <TextArea
        value={value}
        onChange={onChange}
      placeholder={placeholder}
      type={type}
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
    </>
        
    )
}