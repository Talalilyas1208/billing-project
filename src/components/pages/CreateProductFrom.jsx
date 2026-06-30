import { useState, useEffect } from "react";
import { Row, Col, Space, Form } from "antd";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import NumbersInput from "../Numbersinput";
import useFetch from "../../hooks/Usefetch";
import InputTextAreas from "../InputTextAreas";

export default function CreateProductForm(props) {
  const { form, onClose, editingProduct, refetchProducts  ,deleted} = props;
  const navigate = useNavigate();

  const { data: revenueCategory } = useFetch("/api/revnue");
  const { data: currencies } = useFetch("/api/currency");
  const { data: vat } = useFetch("/api/vat");
  const { request, loading: loadingSubmit } = useFetch();
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [revenueOptions, setRevenueOptions] = useState([]);
  const [vatoptions, setVatoptions] = useState([]);

  const isEditing = Boolean(editingProduct);
const deleteds = Boolean(deleted)
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>{item.code}</span>
              {item.description && (
                <span style={{ fontSize: "12px", color: "#8c8c8c" }}>
                  {item.description}
                </span>
              )}
            </div>
          ),
        })),
      );
    }
  }, [vat]);


  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue({
        productname: editingProduct.productname,
        description: editingProduct.description,
        revenueCategory: editingProduct.revenueCategory,
        vat: editingProduct.vat,
        price: editingProduct.price,
        currency: editingProduct.currency,
        productNumber: editingProduct.productNumber,
        supplier: editingProduct.supplier,
      });
    } else {
      form.resetFields();
    }
  }, [editingProduct, form]);

  const onFinish = async (values) => {
    try {
      const url = isEditing
        ? `/api/products/${editingProduct.id}`
        : "/api/products";
      const method = isEditing ? "PUT" : "POST" ?deleteds :"no method here "
      await request(url, method, values);
      form.resetFields();
      if (refetchProducts) {
        refetchProducts();
      }
      if (onClose) {
        onClose();
      } else {
        navigate("/dashboard/products");
      }
    } catch (err) {
      console.error("Save failed:", err);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
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
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
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
            {loadingSubmit
              ? "Saving..."
              : isEditing
              ? "Update"
              : "Save"}
          </Button>
        </div>
      </Form>
    </div>
  );
}