import { Form} from "antd";


import Select from "../Select";
import Numbersinput from "../Numbersinput";

export default function ProductInfo() {
  return (
    <>
      <Form.Item
        name="country"
        label="Country"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
        
           
             showSearch
          
        
        />
      </Form.Item>

      <Form.Item
        name="EAN no"
        label="EAN no"
        rules={[
          {
            required: true,
            message: "Required",
          },
        ]}
      >
        <Numbersinput
          antUI={{
            size: "large",
          }}
        />
      </Form.Item>

     
    </>
  );
}
