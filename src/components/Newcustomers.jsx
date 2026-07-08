import { Form, Row, Col, Space, Dropdown, Button as AntButton } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Input from "./Input";
import Numbersinput from "./Numbersinput";
import Select from "./Select";
import Button from "./Button";
import Config from "./Config";

export default function Newcustomers(props) {
  const { form, onFinish, loadingSubmit } = props;
  const customFields = Form.useWatch("users", form) || [];

  const addFieldMenu = (add) => ({
    items: [
      { key: "input", label: "Text Input" },
      { key: "number", label: "Number Input" },
      { key: "select", label: "Select / Dropdown" },
    ],
    onClick: ({ key }) => {
      add({ type: key, label: "" });
    },
  });
  const renderFieldByType = (type, index) => {
    const commonProps = {
      name: [index, "value"],
      style: { width: "100%" },
    };

    switch (type) {
      case "number":
        return (
          <Numbersinput
            {...commonProps}
            antUI={{ size: "large", precision: 2 }}
            style={{
              ...commonProps.style,
            }}
          />
        );
      case "select":
        return <Select {...commonProps} antUI={{ size: "large" }} />;
      case "input":
      default:
        return (
          <Input
            {...commonProps}
            placeholder="Value"
            antUI={{ size: "large" }}
          />
        );
    }
  };

  return (
    <>
      <Config>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={11}>
              <Form.Item
                name="productname"
                label="Name"
                rules={[
                  { required: true, message: "Please enter product name" },
                ]}
              >
                <Input antUI={{ size: "large" }} />
              </Form.Item>
              <Form.Item name="CvR" label="CvR no" style={{ marginBottom: 8 }}>
                <Input placeholder="None" antUI={{ size: "large" }} />
              </Form.Item>
              <Form.Item
                name="contactPerson"
                label="Contact person"
                style={{ marginBottom: 8 }}
              >
                <Input placeholder="Firstname" antUI={{ size: "large" }} />
              </Form.Item>
              <Form.Item name="contactPhone" style={{ marginBottom: 8 }}>
                <Input placeholder="Surname" antUI={{ size: "large" }} />
              </Form.Item>
              <Form.Item name="contactPhone">
                <Input placeholder="Email" antUI={{ size: "large" }} />
              </Form.Item>
              <Form.Item name="Telephone" label="Telephone">
                <Input placeholder="Telephone" antUI={{ size: "large" }} />
              </Form.Item>
              <Form.Item
                name="adress"
                label="Address"
                style={{ marginBottom: 5 }}
              >
                <Input placeholder="way" antUI={{ size: "large" }} />
              </Form.Item>
              <Row>
                <Col span={8}>
                  <Form.Item name="adress">
                    <Select
                      style={{ width: "100%" }}
                      antUI={{ size: "large" }}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={15}>
                  <Form.Item name="adress">
                    <Select
                      style={{ width: "100%" }}
                      antUI={{ size: "large" }}
                    ></Select>
                  </Form.Item>
                </Col>
              </Row>
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
                <Numbersinput
                  antUI={{ size: "large", precision: 2 }}
                  style={{
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    borderRadius: "0.5rem",
                    width: "100%",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="productNumber"
                label="Product Number"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input antUI={{ size: "large" }} />
              </Form.Item>
              <Form.Item name="supplier" label="Supplier Product Number">
                <Input antUI={{ size: "large" }} />
              </Form.Item>{" "}
              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => {
                      const fieldType = customFields[name]?.type;
                      return (
                        <Row
                          key={key}
                          gutter={12}
                          align="middle"
                          style={{ marginBottom: 10 }}
                        >
                          <Col span={22}>
                            {/* register "type" as a real field so useWatch/customFields sees it */}
                            <Form.Item
                              {...restField}
                              name={[name, "type"]}
                              hidden
                            >
                              <Input />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, "value"]}
                              label="Currency"
                              rules={[
                                { required: true, message: "Missing value" },
                              ]}
                            >
                              {renderFieldByType(fieldType, restField, name)}
                            </Form.Item>
                          </Col>

                          <Col span={1}>
                            <MinusCircleOutlined
                              style={{ marginTop: 38 }}
                              onClick={() => remove(name)}
                            />
                          </Col>
                        </Row>
                      );
                    })}
                    <Form.Item label="Additional information">
                      <Dropdown menu={addFieldMenu(add)} trigger={["click"]}>
                        <Button type="dashed" block icon={<PlusOutlined />}>
                          Add field
                        </Button>
                      </Dropdown>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
              position: "sticky",
              bottom: 0,
              background: "#fff", 
              padding: "12px 0",
              zIndex: 10,
            }}
          >
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
              className="py-3 px-8"
            >
              Update
            </Button>
          </div>
        </Form>
      </Config>
    </>
  );
}
