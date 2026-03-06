import { useState} from "react";
import { useEffect } from "react";
import { Row, Col } from "antd";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Select from "../components/Select";
import Table from "../components/Table";

import usefetch from "../Hooks/usefetch";
import Config from "../components/Config";

export default function Products() {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [formData, setFormData] = useState({
    productname: "",
    price: "",
    currency: "",
    description: "",
    productNumber: "",
    revenueCategory: "",
    supplier: "",
  });

  const {
    data: products,loading: productsLoading, refetch: refetchProducts, } = usefetch("/api/products");

  const {
    data: currencies,
    loading: currencyLoading,
    error: currencyError,
  } = usefetch("/api/currency");

  const {
    data: revenueCategory,
    loading: revenueLoading,
    error: revenueError,
  } = usefetch("/api/revnue");

  const validProducts = products?.filter((p) => p && p.productname) || [];

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
        setIsOpen(false);

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
  if (currencyLoading || productsLoading || revenueLoading) return null;
  if (currencyError) {
    return (
      <div style={{ padding: "16px", color: "red", textAlign: "center" }}>
        {currencyError}
      </div>
    );
  }
  const currencyOptions =
    currencies?.map((item) => ({
      value: item.code,
      label: item.code,
    })) || [];
  const revenueOptions =
    revenueCategory?.map((item) => ({
      value: item.key || item.id || "1",
      label: item.code || item.name || "Select Category",
    })) || [];
    
  return (
    <Config>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 40,
          }}
        >
          <h1 style={{ fontSize: 32, fontWeight: 600 }}>Products</h1>

          <Button onClick={() => setIsOpen(true)} variant="product">
            Create Product
          </Button>
        </div>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h2 style={{ fontSize: 22 }}>Create Product</h2>
            <Row gutter={16}>
              <Col span={14}>
                <Row gutter={[0, 16]}>
                  <Col span={24}>
                    <Input
                      label="Name"
                      name={"productname"}
                     
                      value={formData.productname}
                      onChange={handleChange}
                       multiline
                      size="large"
                    />
                  </Col>
                  <Col span={24}>
                    <Input
                      label={"Description"}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      size={"large"}
                       multiline
                      placeholder={"None"} />
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
              <Col span={10}>
                <Row gutter={[16, 16]}>
                  <Col span={16}>
                    <Input
                      label={"Price"}
                      name="price"
                      type="number"
                      value={formData.price}
                     controls={false}
                      onChange={handleChange}
                      size="large"/>
                  </Col>
                  <Col span={8}>
                    <Select
                      showSearch
                      label={"Currency"}
                      value={formData.currency}
                      onChange={handleCurrencyChange}
                      options={currencyOptions}/>
                  </Col>
                  <Col span={24}>
                    <Input
                      label={"Product Number"}
                      name="productNumber"
                      value={formData.productNumber}
                      onChange={handleChange}
                      size="large" />
                  </Col>
                  <Col span={24}>
                    <Input
                      label={"Supplier Product Number"}
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleChange}
                      size="large"/>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleSave} disabled={loadingSubmit}>
                {loadingSubmit ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </Modal>

        <Table products={validProducts} />
      </div>
    </Config>
  );
}
