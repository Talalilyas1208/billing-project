import { useState } from "react";
import { Row, Col, Space, Form } from "antd";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import NumbersInput from "../Numbersinput";    
import useFetch from "../../hooks/Usefetch";   
import InputTextAreas from "../InputTextAreas";

export default function CreateProductForm(props) {
  const { refetchProducts, onClose,form } = props ;

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const onFinish = async (values) => {
    setLoadingSubmit(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        form.resetFields();
        onClose();
        if (refetchProducts) refetchProducts();
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setLoadingSubmit(false);
    }
  }
  const { data: revenueCategory } = useFetch("/api/revnue");
  const { data: currencies } = useFetch("/api/currency");
  const {data:vat} =useFetch("/api/vat")
const currencyOptions = Array.isArray(currencies.data)
  ? currencies.data.map((item) => ({
      value: item.code,
      label: item.code,
    }))
  : [];

const revenueOptions = Array.isArray(revenueCategory.data)
  ? revenueCategory.data.map((item) => ({
      value: String(item.key || item.code || ""),
      label: item.name || item.code || "Select Category",
    }))
  : [];

const vatoptions = Array.isArray(vat.data)
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
  : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>    
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          currency: "PKR",
          
        }}
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
                style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.1)", borderRadius: "0.5rem" ,width:"100%" }}
              />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <InputTextAreas
                placeholder="None"
                antUI={{ minRows: 2, maxRows: 2, size: "large" }}
                style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.1)", borderRadius: "0.5rem" }}
              />
            </Form.Item>

            <Form.Item 
              name="revenueCategory" 
              label="Revenue Category"
              rules={[{ required: true }]}
            >
              <Select showSearch options={revenueOptions} />
            </Form.Item>
            <Form.Item 
              name="vat" 
              label="VAT"
              rules={[{ required: true }]}
            >
              <Select showSearch options={vatoptions} />
            </Form.Item>
          </Col>

          <Col span={1}><Space /></Col>
          <Col span={9}>
            <Row gutter={12}>
              <Col span={16}>
                <Form.Item 
                  name="price" 
                  label="Price"
                  rules={[{ required: true, message: '' }]}
                >
                  <NumbersInput
                    antUI={{ size: "large", precision: 2 }}
                    style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.1)", borderRadius: "0.5rem", width : "100%"}}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="currency" label="Currency">
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
                style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.1)", borderRadius: "0.5rem" }}
              />
            </Form.Item>

            <Form.Item name="supplier" label="Supplier Product Number">
              <Input
                antUI={{ size: "large" }}
                style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.1)", borderRadius: "0.5rem" }}
              />
            </Form.Item>
          </Col>
        </Row>

{/* <Button onClick={handleCancelRequest} type="secondary">
            Cancel
          </Button> */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <Button onClick={() => form.submit()} disabled={loadingSubmit}>
            {loadingSubmit ? "Saving..." : "Save"}
          </Button>
        </div>
      </Form>
    </div>
  );
}