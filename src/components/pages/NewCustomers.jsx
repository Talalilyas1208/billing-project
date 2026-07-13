import { Form, Row, Col, Space, Dropdown } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Input from "../Input";
import Numbersinput from "../Numbersinput";
import useFetch from "../../hooks/Usefetch";
import Select from "../Select";
import Button from "../Button";
import { useEffect } from "react";
import { useState } from "react";
import Config from "../Config";
import styles from "../App.module.css"

export default function NewCustomers(props) {
  const { form, onFinish } = props;
  const customFields = Form.useWatch("users", form) || [];
  const { data: revenueCategory } = useFetch("/api/revnue");
  const { data: currencies } = useFetch("/api/currency");
  const { data: vat } = useFetch("/api/vat");
  const { request, loading: loadingSubmit } = useFetch();
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [revenueOptions, setRevenueOptions] = useState([]);
  const [vatoptions, setVatoptions] = useState([]);

  useEffect(() => {
    if (Array.isArray(currencies?.data)) {
      setCurrencyOptions(
        currencies.data.map((item) => ({
          value: item.code,
          label: item.code,
        })),
      );
    }
  }, [currencies]);

  useEffect(() => {
    if (Array.isArray(revenueCategory?.data)) {
      setRevenueOptions(
        revenueCategory.data.map((item) => ({
          value: String(item.key || item.code || ""),
          label: item.name || item.code || "Select Category",
        })),
      );
    }
  }, [revenueCategory]);

  useEffect(() => {
    if (Array.isArray(vat?.data)) {
      setVatoptions(
        vat.data.map((item) => ({
          value: item.code,
          label: (
            <div className="vatOptionWrapper">
              <span>{item.code}</span>
              {item.description && (
                <span className="vatOptionDescription">
                  {item.description}
                </span>
              )}
            </div>
          ),
        })),
      );
    }
  }, [vat]);

  const fieldTypeOptions = [
    { key: "input", label: "Text Input" },
    { key: "number", label: "Number Input" },
    { key: "select", label: "Select / Dropdown" },
  ];

  const addFieldMenu = (add) => ({
    items: fieldTypeOptions,
    onClick: ({ key }) => {
      const label =
        fieldTypeOptions.find((option) => option.key === key)?.label ?? key;
      add({ type: key, label });
    },
  });

  const renderFieldByType = (type, index, label) => {
    const commonProps = {
      name: [index, "value"],
      label,
      className: "fullWidth",
    };

    switch (type) {
      case "number":
        return (
          <Numbersinput
            {...commonProps}
            antUI={{ size: "large", precision: 2 }}
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
              <Form.Item name="CvR" label="CvR no" className="formItemTight">
                <Input placeholder="None" antUI={{ size: "large" }} />
              </Form.Item>
              <Form.Item
                name="contactPersonFirstname"
                label="Contact person"
                className="formItemTight"
              >
                <Input placeholder="Firstname" antUI={{ size: "large" }} />
              </Form.Item>
              <Form.Item name="contactPersonSurname" className="formItemTight">
                <Input placeholder="Surname" antUI={{ size: "large" }} />
              </Form.Item>
              <Form.Item name="contactEmail">
                <Input placeholder="Email" antUI={{ size: "large" }} />
              </Form.Item>
              <Form.Item name="Telephone" label="Telephone">
                <Input placeholder="Telephone" antUI={{ size: "large" }} />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                className="formItemAddressLast"
              >
                <Input placeholder="way" antUI={{ size: "large" }} />
              </Form.Item>
              <Row>
                <Col span={8}>
                  <Form.Item name="addressCurrency">
                    <Select showSearch options={currencyOptions} />
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={15}>
                  <Form.Item name="addressCountryOrRegion">
                    <Select
                      className="fullWidth"
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
                  className="priceInput"
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
                      const fieldLabel = customFields[name]?.label;
                      return (
                        <Row
                          key={key}
                          gutter={12}
                          align="middle"
                          className="customFieldRow"
                        >
                          <Col span={22}>
                            <Form.Item
                              {...restField}
                              name={[name, "type"]}
                              hidden
                            >
                              <Input />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, "label"]}
                              hidden
                            >
                              <Input />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, "value"]}
                              label={fieldLabel}
                              rules={[
                                { required: true, message: "Missing value" },
                              ]}
                            >
                              {renderFieldByType(fieldType, name, fieldLabel)}
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
          <div className={styles.footerBar}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={loadingSubmit}
              loading={loadingSubmit}
              className={styles}
            >
              Update
            </Button>
          </div>
        </Form>
      </Config>
    </>
  );
}