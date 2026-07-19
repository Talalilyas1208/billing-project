import { Form, Row, Col, Dropdown } from "antd";

import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

import Input from "../Input";
import Numbersinput from "../Numbersinput";
import Select from "../Select";
import Button from "../Button";

export default function CustomFields({
  customFields,
  fieldTypeMenuOptions,
  currencyOptions,
}) {
  const renderField = (type, name, label) => {
    const props = {
      name: [name, "value"],
      label,

      className: "fullWidth",
    };

    if (type === "number") {
      return (
        <Numbersinput
          {...props}
          antUI={{
            size: "large",
            precision: 2,
          }}
        />
      );
    }

    if (type === "currency") {
      return (
        <Select
          {...props}
          options={currencyOptions}
          showSearch
          antUI={{
            size: "large",
          }}
        />
      );
    }

    if (type === "select") {
      return (
        <Select
          {...props}
          antUI={{
            size: "large",
          }}
        />
      );
    }
    return (
      <Input
        {...props}
        placeholder="Value"
        antUI={{
          size: "large",
        }}
      />
    );
  };

  const menu = (add) => ({
    items: fieldTypeMenuOptions.map(({ key, label }) => ({
      key,
      label,
    })),

    onClick: ({ key }) => {
      const selected = fieldTypeMenuOptions.find((item) => item.key === key);

      if (!selected) return;

      add({
        type: selected.type,
        label: selected.label,
        value: undefined,
      });
    },
  });

  return (
    <Form.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => {
            console.log(name)
            const field = customFields[name];

            return (
              <Row key={key} gutter={12} align="middle">
                <Col span={22}>
                  <Form.Item {...restField} name={[name, "type"]} hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "label"]} hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "value"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing value",
                      },
                    ]}
                  >
                    {renderField(field?.type, name, field?.label)}
                  </Form.Item>
                </Col>


                <Col span={1}>
                  <MinusCircleOutlined
                    className="removeFieldIcon"
                    onClick={() => remove(name)}
                  />
                </Col>
              </Row>
            );
          })}
          <Form.Item label="Additional information">
            <Dropdown menu={menu(add)} trigger={["click"]}>
              <Button type="dashed" block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Dropdown>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
}
