import { Form } from "antd";
import Input from "../Input";
import Numbersinput from "../Numbersinput";

export default function ProductInfo() {
  return (
    <>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true }]}
      >
        <Numbersinput
          antUI={{ size: "large", precision: 2 }}
        />
      </Form.Item>

      <Form.Item
        name="productNumber"
        label="Product Number"
        rules={[
          {
            required: true,
            message: "Required",
          },
        ]}
      >
        <Input antUI={{ size: "large" }} />
      </Form.Item>

      <Form.Item
        name="supplier"
        label="Supplier Product Number"
      >
        <Input antUI={{ size: "large" }} />
      </Form.Item>
    </>
  );
}