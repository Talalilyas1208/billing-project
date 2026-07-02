import { Form, Row, Col, Space, Dropdown, Button as AntButton } from "antd";
import { PlusOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";
import Input from "./Input";
import InputTextAreas from "./InputTextAreas";
import Select from "./Select";
import Numbersinput from "./Numbersinput";
import Button from "./Button";

export default function Newcustomers(props) {
  const { form, onFinish, loadingSubmit } = props;


  const customFields = Form.useWatch("customFields", form) || [];
console.log(customFields)
  const addFieldMenu = (add) => ({
    items: [
      { key: "input", label: "Text Input" },
      { key: "number", label: "Number Input" },
      { key: "select", label: "Select / Dropdown" },
    ],
    onClick: ({ key }) => {
      add({ type: key, label: "", value: undefined });
    },
  });

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={11}>
            <Form.Item
              name="productname"
              label="Name"
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input
                antUI={{ size: "large" }}
               
              />
            </Form.Item>

            <Form.Item name="CvR" label="CvR no">
              <Input
                placeholder="None"
                antUI={{size: "large" }}
               
              />
            </Form.Item>
          </Col>

          <Col span={1}>
            <Space />
          </Col>

          <Col span={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "" }]}
            >
              <Input
                antUI={{ size: "large", precision: 2 }}
               
              />
            </Form.Item>

            <Form.Item
              name="productNumber"
              label="Product Number"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input
                antUI={{ size: "large" }}
              />
            </Form.Item>

            <Form.Item name="supplier" label="Supplier Product Number">
              <Input
                antUI={{ size: "large" }}
              />
            </Form.Item>
            <Form.List name="customFields">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => {
                    const { key, ...restField } = field;
                    const fieldType = customFields?.[field.name]?.type;

                    return (
                      <Row key={key} gutter={8} align="middle">
                        <Col span={10}>
                          <Form.Item
                            {...restField}
                            name={[field.name, "label"]}
                            rules={[{ required: true, message: "Enter label" }]}
                          >
                            <Input
                              placeholder="Field label"
                              antUI={{ size: "large" }}
                              style={{ borderRadius: "0.5rem" }}
                            />
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[field.name, "value"]}
                            rules={[{ required: true, message: "Required" }]}
                          >
                            {fieldType === "select" ? (
                              <Select showSearch />
                            ) : fieldType === "number" ? (
                              <Numbersinput
                                antUI={{ size: "large" }}
                                style={{ width: "100%" }}
                              />
                            ) : (
                              <Input
                                antUI={{ size: "large" }}
                                style={{ borderRadius: "0.5rem" }}
                              />
                            )}
                          </Form.Item>
                        </Col>

                        <Col span={2}>
                          <DeleteOutlined
                            onClick={() => remove(field.name)}
                            style={{ color: "#999", cursor: "pointer" }}
                          />
                        </Col>
                        <Form.Item {...restField} name={[field.name, "type"]} hidden>
                          <input type="hidden" />
                        </Form.Item>
                      </Row>
                    );
                  })}
                  <Form.Item>
                    <Dropdown menu={addFieldMenu(add)} trigger={["click"]}>
                      <AntButton
                        icon={<PlusOutlined />}
                        style={{ borderRadius: "0.5rem" }}
                      >
                        Add Field <DownOutlined />
                      </AntButton>
                    </Dropdown>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loadingSubmit}
            loading={loadingSubmit}
            antUI={{ size: "large" }}
            style={{
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "0.5rem",
            }}
            className="py-3 px-8">
            Update
          </Button>
        </div>
      </Form>
    </>
  );
}