import { useState } from "react";
import { Row, Col, Space } from "antd";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import Multilineinput from "./Multilineinput";
import Numbersinput from "./Numbersinput";
import usefetch from "../Hooks/usefetch";
import { Form } from "antd";

export default function Createproductfrom(props) {
 
  const {  refetchProducts, onClose } = props;

  
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [formData, setFormData] = useState({
    productname: "",
    price: "",
    currency: "PKR",
    description: "",
    productNumber: "",
    revenueCategory: "1",
    supplier: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCurrencyChange = (val) => {
    setFormData((prev) => ({
      ...prev,
      currency: val,
    }));
  };

  const handleRevenueChange = (val) => {
    setFormData((prev) => ({
      ...prev,
      revenueCategory: val,
    }));
  };

  const handleSave = async () => {
    setLoadingSubmit(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
       
        onClose(); 

        setFormData({
          productname: "",
          price: "",
          currency: "",
          description: "",
          productNumber: "",
          revenueCategory: "",
          supplier: "",
        });

        refetchProducts && refetchProducts();
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setLoadingSubmit(false);
    }
    
  };
   const {
    data: revenueCategory,
    loading: revenueLoading,
    error: revenueError,
  } = usefetch("/api/revnue");
  const {
    data: currencies,
    loading: currencyLoading,
    error: currencyError,
  } = usefetch("/api/currency");
   const currencyOptions =
    currencies?.map((item) => ({
      value: item.code,
      label: item.code,
    })) || [];

  const revenueOptions =
    revenueCategory?.map((item) => ({
      value: String(item.id || item.key || ""),
      label: item.name || item.code || "Select Category",
    })) || [];
  

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ fontSize: 22 }}>Create Product</h2>
      <Form>
      <Row gutter={16}>
        <Col span={14}>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Input
                label="Name"
                name={"productname"}
                value={formData.productname}
                onChange={handleChange}
                antUI={{ size: "large" }}
                className=" w-full text-gray-400"
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  borderRadius: "0.5rem",
                  width: "100%",
                }}
              />
            </Col>

            <Col span={24}>
              <Multilineinput
                label={"Description"}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={"None"}
                className=" text-gray-400"
                antUI={{ minRows: 2, maxRows: 2, size: "large" }}
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  borderRadius: "0.5rem",
                  width: "100%",
                }}
              />
            </Col>

            <Col span={24}>
              <Select
                showSearch
                label={"Revenue Category"}
                value={formData.revenueCategory}
                onChange={handleRevenueChange}
                options={revenueOptions}
              />
            </Col>
          </Row>
        </Col>

        <Space size="middle"></Space>

        <Col span={10}>
          <Row gutter={[23, 16]}>
            <Col span={16}>
              <Numbersinput
                label="Price"
                name="price"
                value={formData.price}
                showControls={false}
                onChange={handleChange}
                antUI={{
                  size: "large",
                  precision: 2,
                }}
                className=" w-full text-gray-400"
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  borderRadius: "0.5rem",
                  width: "100%",
                }}
              />
            </Col>

            <Col span={8}>
              <Select
                showSearch
                label={"Currency"}
                value={formData.currency}
                onChange={handleCurrencyChange}
                options={currencyOptions}
              />
            </Col>

            <Col span={24}>
              <Input
                label={"Product Number"}
                name="productNumber"
                value={formData.productNumber}
                onChange={handleChange}
                antUI={{ size: "large" }}
                className=" w-full text-gray-400"
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  borderRadius: "0.5rem",
                  width: "100%",
                }}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                   
                      
                    },
                  ]}
              />
            </Col>

            <Col span={24}>
              <Input
                label={"Supplier Product Number"}
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                antUI={{ size: "large", width: "80%" }}
                className=" w-full text-gray-400"
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  borderRadius: "0.5rem",
                  width: "100%",
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
</Form>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleSave} disabled={loadingSubmit}>
          {loadingSubmit ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}