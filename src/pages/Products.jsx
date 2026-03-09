import { useState } from "react";
import { useEffect } from "react";
import { Row, Col, Space } from "antd";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Select from "../components/Select";
import Table from "../components/Table";

import usefetch from "../Hooks/usefetch";
import Config from "../components/Config";
import Multilineinput from "../components/Multilineinput";
import Numbersinput from "../components/Numbersinput";
import Createproductfrom from "../components/Createproductfrom";

export default function Products() {
  const [isOpen, setIsOpen] = useState(false);
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

  const {
    data: products,
    loading: productsLoading,
    refetch: refetchProducts,
  } = usefetch("/api/products");

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
      value: String(item.id || item.key || ""),
      label: item.name || item.code || "Select Category",
    })) || [];

  return (
    <Config>
      <div style={{ padding: "0 24px" }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 40 }}>
          <Col>
            <h1 style={{ fontSize: 32, fontWeight: 600 }}>Products</h1>
          </Col>
          <Col>
            <Button onClick={() => setIsOpen(true)} variant="product">
              Create Product
            </Button>
          </Col>
        </Row>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
           <Createproductfrom 
            formData={formData}
            handleChange={handleChange}
            handleCurrencyChange={handleCurrencyChange}
            handleRevenueChange={handleRevenueChange}
            currencyOptions={currencyOptions}
            revenueOptions={revenueOptions}
            handleSave={handleSave}
            loadingSubmit={loadingSubmit}
          />
        </Modal>

        <Table products={validProducts} />
      </div>
    </Config>
  );
}
