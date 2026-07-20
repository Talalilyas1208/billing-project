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
  const renderField = (type, options, name) => {
    const props = {
      name: [name, "value"],
      className: "fullWidth",
    };

    const normalizedType = String(type || "").toLowerCase();

    if (normalizedType === "number") {
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

    if (normalizedType === "currency") {
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

    if (normalizedType === "select") {
      return (
        <Select
          {...props}
          options={options}
          showSearch
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

  const usedLabels = (customFields || []).map((item) => item?.label);

  const availableMenuOptions = fieldTypeMenuOptions.filter(
    (item) => !usedLabels.includes(item.label),
  );

  const menu = (add) => ({
    items: availableMenuOptions.map(({ key, label }) => ({
      key,
      label,
    })),

    onClick: ({ key }) => {
      const selected = availableMenuOptions.find((item) => item.key === key);

      if (!selected) return;

      add({
        type: selected.type,
        label: selected.label,
        options: selected.options,
        value: undefined,
      });
    },
  });

  return (
    <Form.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => {
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
                  <Form.Item {...restField} name={[name, "options"]} hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "value"]}
                    label={field?.label}
                    rules={[
                      {
                        required: true,
                        message: "Missing value",
                      },
                    ]}
                  >
                    {renderField(field?.type, field?.options, name)}
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
          {availableMenuOptions.length > 0 && (
            <Form.Item label="Additional information">
              <Dropdown menu={menu(add)} trigger={["click"]}>
                <Button type="dashed" block icon={<PlusOutlined />}>
                  Add field
                </Button>
              </Dropdown>
            </Form.Item>
          )}
        </>
      )}
    </Form.List>
  );
}