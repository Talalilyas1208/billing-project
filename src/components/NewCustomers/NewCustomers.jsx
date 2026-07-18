import { Form, Row, Col } from "antd";
import { useEffect, useState } from "react";

import useFetch from "../../hooks/Usefetch";
import Config from "../Config";
import Button from "../Button";

import CustomerBasicInfo from "./CustomerBasicInfo";
import ProductInfo from "./ProductInfo";
import CustomFields from "./CustomFields";

import styles from "../App.module.css";

export default function NewCustomers(props) {
  const { form, onTouch, refetchCustomers, onClose } = props;

  const customFields = Form.useWatch("users", form) || [];


  const { data: currencies } = useFetch("/api/currency");
  const { data: revenueCategory } = useFetch("/api/revnue");
  const { data: fieldTypeOptions } = useFetch("/api/labelforfield");
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [revenueOptions, setRevenueOptions] = useState([]);
  const [fieldTypeMenuOptions, setFieldTypeMenuOptions] = useState([]);

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
    if (Array.isArray(fieldTypeOptions?.data)) {
      setFieldTypeMenuOptions(
        fieldTypeOptions.data.map((item) => ({
          key: String(item.key ?? item.code ?? item.id),

          label: item.label ?? item.name ?? item.code ?? "Field",

          type: item.type ?? item.fieldType ?? "input",
        })),
      );
    }
  }, [fieldTypeOptions]);
  const handleCreate = async () => {
    try {
      const values = await form.validateFields();

      const response = await fetch("/api/Customer", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(values),
      });

      if (response.ok) {
        refetchCustomers();
        onClose();
        form.resetFields();
      }
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };

  return (
    <Config>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreate}
        onValuesChange={() => onTouch && onTouch()}
        clearOnDestroy
      >
        <Row gutter={16}>
          <CustomerBasicInfo
            currencyOptions={currencyOptions}
            revenueOptions={revenueOptions}
          />
          <Col span={1} />
          <Col span={12}>
            <ProductInfo />
            <CustomFields
              customFields={customFields}
              fieldTypeMenuOptions={fieldTypeMenuOptions}
              currencyOptions={currencyOptions}
            />
          </Col>
        </Row>

        {/* FOOTER */}
        <div className={styles.footerBar}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </div>
      </Form>
    </Config>
  );
}
