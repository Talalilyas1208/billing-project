import { useMemo, useState } from "react";
import { Row, Col, Space, Form,App } from "antd";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import NumbersInput from "../Numbersinput";
import InputTextAreas from "../InputTextAreas";
import {
  useGetRevenueCategoriesQuery,
  useGetCurrenciesQuery,
  useGetVatQuery,
  useAddProductMutation,
  useUpdateProductMutation,
} from "../../store/apiSlice";

export default function MangeProductForm(props) {
  const { form, onClose, editingProduct, refetchProducts, onTouch, onSuccess } = props;
  const navigate = useNavigate();
    const { message } = App.useApp();

  const { data: revenueCategory } = useGetRevenueCategoriesQuery();
  const { data: currencies } = useGetCurrenciesQuery();
  const { data: vat } = useGetVatQuery();
  const [addProduct, { isLoading: addingProduct }] = useAddProductMutation();
  const [updateProduct, { isLoading: updatingProduct }] = useUpdateProductMutation();

  const currencyOptions = useMemo(
    () =>
      Array.isArray(currencies?.data)
        ? currencies.data.map((item) => ({
            value: item.code,
            label: item.code,
          }))
        : [],
    [currencies],
  );

  const revenueOptions = useMemo(
    () =>
      Array.isArray(revenueCategory?.data)
        ? revenueCategory.data.map((item) => ({
            value: String(item.key || item.code || ""),
            label: item.name || item.code || "Select Category",
          }))
        : [],
    [revenueCategory],
  );

  const vatoptions = useMemo(
    () =>
      Array.isArray(vat?.data)
        ? vat.data.map((item) => ({
            value: item.code,
            label: (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>{item.code}</span>
                {item.description && (
                  <span style={{ fontSize: "12px", color: "#8c8c8c" }}>
                    {item.description}
                  </span>
                )}
              </div>
            ),
          }))
        : [],
    [vat],
  );

  const isediting = Boolean(editingProduct);
  const onFinish = async (values) => {
    try {
      if (isediting) {
        await updateProduct({ id: editingProduct.id, ...values }).unwrap();
      } else {
        await addProduct(values).unwrap();
      }
      message.success("Product saved successfully");
      form.resetFields();
      if (refetchProducts) {
        refetchProducts();
      }
      if (typeof onSuccess === "function") {
        onSuccess(values);
      }
      if (onClose) {
        onClose();
      } else {
        navigate("/dashboard/products");
      }
    } catch (err) {
      console.error("Save failed:", err);
      message.error("Failed to save product");
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={() => onTouch && onTouch()}
      >
        <Row gutter={16}>
          <Col span={14}>
            <Form.Item
              name="productname"
              label="Name"
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input
                antUI={{ size: "large" }}
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  borderRadius: "0.5rem",
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <InputTextAreas
                placeholder="None"
                antUI={{ minRows: 2, maxRows: 2, size: "large" }}
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  borderRadius: "0.5rem",
                }}
              />
            </Form.Item>
            <Form.Item
              name="revenueCategory"
              label="Revenue Category"
              rules={[{ required: true }]}
            >
              <Select showSearch options={revenueOptions} />
            </Form.Item>
            <Form.Item name="vat" label="VAT" rules={[{ required: true }]}>
              <Select showSearch options={vatoptions} />
            </Form.Item>
          </Col>
          <Col span={1}>
            <Space />
          </Col>
          <Col span={9}>
            <Row gutter={12}>
              <Col span={16}>
                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: true, message: "" }]}
                >
                  <NumbersInput
                    antUI={{ size: "large", precision: 2 }}
                    style={{
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      borderRadius: "0.5rem",
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="currency"
                  label="Currency "
                  rules={[{ required: true, message: "choose currency" }]}
                >
                  <Select showSearch options={currencyOptions} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="productNumber"
              label="Product Number"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input
                antUI={{ size: "large" }}
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  borderRadius: "0.5rem",
                }}
              />
            </Form.Item>
            <Form.Item name="supplier" label="Supplier Product Number">
              <Input
                antUI={{ size: "large" }}
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  borderRadius: "0.5rem",
                }}
              />
            </Form.Item>
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
            disabled={addingProduct || updatingProduct}
            loading={addingProduct || updatingProduct}
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
    </div>
  );
}
