
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
  const {
    form,
    onTouch,
    refetchCustomers,
    onClose,
  } = props;

  // Dynamic custom fields
  const customFields =
    Form.useWatch("users", form) || [];

  // API calls
  const { data: currencies } =
    useFetch("/api/currency");

  const { data: revenueCategory } =
    useFetch("/api/revnue");

  const { data: fieldTypeOptions } =
    useFetch("/api/labelforfield");

  // State
  const [currencyOptions, setCurrencyOptions] =
    useState([]);

  const [revenueOptions, setRevenueOptions] =
    useState([]);

  const [fieldTypeMenuOptions, setFieldTypeMenuOptions] =
    useState([]);

  // Currency options
  useEffect(() => {
    if (Array.isArray(currencies?.data)) {
      setCurrencyOptions(
        currencies.data.map((item) => ({
          value: item.code,
          label: item.code,
        }))
      );
    }
  }, [currencies]);

  // Revenue options
  useEffect(() => {
    if (Array.isArray(revenueCategory?.data)) {
      setRevenueOptions(
        revenueCategory.data.map((item) => ({
          value: String(
            item.key || item.code || ""
          ),
          label:
            item.name ||
            item.code ||
            "Select Category",
        }))
      );
    }
  }, [revenueCategory]);

  // Custom field options
  useEffect(() => {
    if (Array.isArray(fieldTypeOptions?.data)) {
      setFieldTypeMenuOptions(
        fieldTypeOptions.data.map((item) => ({
          key: String(
            item.key ??
              item.code ??
              item.id
          ),

          label:
            item.label ??
            item.name ??
            item.code ??
            "Field",

          type:
            item.type ??
            item.fieldType ??
            "input",
        }))
      );
    }
  }, [fieldTypeOptions]);

  // Submit customer
  const handleCreate = async () => {
    try {
      const values =
        await form.validateFields();

      const response = await fetch(
        "/api/Customer",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        refetchCustomers();
        onClose();
        form.resetFields();
      }
    } catch (error) {
      console.log(
        "Validate Failed:",
        error
      );
    }
  };

  return (
    <Config>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreate}
        onValuesChange={() =>
          onTouch && onTouch()
        }
        clearOnDestroy
      >
        <Row gutter={16}>

          {/* Customer information */}
          <CustomerBasicInfo
            currencyOptions={
              currencyOptions
            }
            revenueOptions={
              revenueOptions
            }
          />

          {/* Space between columns */}
          <Col span={1} />

          {/* Product information */}
          <Col span={12}>
            <ProductInfo />

            {/* Dynamic fields */}
            <CustomFields
              customFields={
                customFields
              }
              fieldTypeMenuOptions={
                fieldTypeMenuOptions
              }
              currencyOptions={
                currencyOptions
              }
            />
          </Col>

        </Row>
        <div
          className={
            styles.footerBar
          }
        >
          <Button
            type="primary"
            htmlType="submit"
          >
            Update
          </Button>
        </div>
      </Form>
    </Config>
  );
}

