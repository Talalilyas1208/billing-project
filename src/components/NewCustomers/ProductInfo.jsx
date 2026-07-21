import { Form } from "antd";
import Select from "../Select";
import Numbersinput from "../Numbersinput";

export default function ProductInfo({ language }) {
  return (
    <>
      <Form.Item
        name="Language"
        label="Languafe"
        rules={[
          {
            required: true,
          },
        ]} >
        <Select showSearch options={language} />
      </Form.Item>
      <Form.Item
        name="EAN no"
        label="EAN no"
        rules={[
          {
            required: true,
            message: "Required",
          },
        ]}>
        <Numbersinput
          antUI={{
            size: "large",
          }}/>
      </Form.Item>
    </>
  );
}
