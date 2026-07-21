import { Form, Row, Col, message } from "antd";
import { useMemo } from "react";

import useFetch from "../../hooks/Usefetch";
import Config from "../Config";
import Button from "../Button";
import CustomerBasicInfo from "./CustomerBasicInfo";
import ProductInfo from "./ProductInfo";
import CustomFields from "./CustomFields";
import styles from "../App.module.css";

const mapCurrencyOptions = (data = []) =>
  data.map(({ code }) => ({
    value: code,
    label: code,
  }));

const mapRevenueOptions = (data = []) =>
  data.map(({ key, code, name }) => ({
    value: String(key || code || ""),
    label: name || code || "Select Category",
  }));

const mapLanguageOptions = (data = []) =>
  data.map(({ country_name }) => ({
    value: country_name || "",
    label: country_name || "Select Country",
  }));

const mapFieldTypeOptions = (data = []) =>
  data.map((item) => ({
    key: String(item.key ?? item.code ?? item.id),
    label: item.label ?? item.name ?? item.code ?? "Field",
    type: String(item.type ?? item.fieldType ?? "input").toLowerCase(),
    options: Array.isArray(item.options) ? item.options : [],
  }));

export default function NewCustomers({
  form,
  onTouch,
  refetchCustomers,
  onClose,
}) {
  const customFields = Form.useWatch("users", form) || [];

  const { data: currencies } = useFetch("/api/currency");
  const { data: revenueCategory } = useFetch("/api/revnue");
  const { data: fieldTypeOptions } = useFetch("/api/labelforfield");
  const { data: language } = useFetch("/api/Language");

  const currencyOptions = useMemo(
    () => mapCurrencyOptions(currencies?.data),
    [currencies?.data],
  );

  const revenueOptions = useMemo(
    () => mapRevenueOptions(revenueCategory?.data),
    [revenueCategory?.data],
  );

  const languageOptions = useMemo(
    () => mapLanguageOptions(language?.data),
    [language?.data],
  );

  const fieldTypeMenuOptions = useMemo(
    () => mapFieldTypeOptions(fieldTypeOptions?.data),
    [fieldTypeOptions?.data],
  );

  const handleCustomFieldChange = () => {
    console.log("Custom field changed");
  };

  const handleCreate = async (values) => {
    try {
      const response = await fetch("/api/Customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create customer");
      }

      message.success("Customer created successfully");

      await refetchCustomers?.();

      form.resetFields();
      onClose?.();
    } catch (error) {
      console.error("Create customer failed:", error);
      message.error("Failed to create customer");
    }
  };

  return (
    <Config>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreate}
        onValuesChange={() => onTouch?.()}
        clearOnDestroy
      >
        <Row gutter={16}>
          <CustomerBasicInfo
            currencyOptions={currencyOptions}
            revenueOptions={revenueOptions}
          />

          <Col span={1} />

          <Col span={12}>
            <ProductInfo language={languageOptions} />

            <CustomFields
              customFields={customFields}
              fieldTypeMenuOptions={fieldTypeMenuOptions}
              currencyOptions={currencyOptions}
              onChange={handleCustomFieldChange}
            />
          </Col>
        </Row>

        <div className={styles.footerBar}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </div>
      </Form>
    </Config>
  );
}