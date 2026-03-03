import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { useState } from "react";
import usefetch from "../Hooks/usefetch";
import Select from "../components/Select";
import Table from "../components/Table";

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
    loading: revenueloading,
    error: revenueError,
  } = usefetch("/api/revnue");
  const validProducts = products?.filter((p) => p && p.productname) || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrencyChange = (val) => {
    setFormData((prev) => ({ ...prev, currency: val }));
  };
  const handlerevnue = (val) => {
    setFormData((prev) => ({ ...prev, revenueCategory: val }));
  };
  const handleSave = async () => {
    setLoadingSubmit(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        });
        if (refetchProducts) refetchProducts();
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (currencyLoading || productsLoading) return null;
  if (currencyError)
    return <div className="p-4 text-red-500 text-center">{currencyError}</div>;

  const currencyOptions =
    currencies?.map((item) => ({
      value: item.code,
      label: `${item.code}`,
    })) || [];
  const revnueoption = revenueCategory?.map((item) => ({
    value: item.key || item.id || "",
    label: item.code || item.name || "Select Category",
  }));

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-900">Products</h1>
        <Button onClick={() => setIsOpen(true)} variant="product">
          create product
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col gap-3">
          <p className="text-[22px] font-normal">Create Product</p>
          <div className="flex gap-6">
            <Input
              name="productname"
              value={formData.productname}
              onChange={handleChange}
              width="xxlg"
              label="Name"
            />
            <Input
              name="price"
              placeholder="Unit price"
              value={formData.price}
              onChange={handleChange}
              width="sm"
              label="Price"
            />
            <Select
              width="sm"
              value={formData.currency}
              onChange={handleCurrencyChange}
              options={currencyOptions}
            />
          </div>
          <div className="flex gap-5">
            <Input
              name="description"
              placeholder="NONE"
              value={formData.description}
              onChange={handleChange}
              width="xxlg"
              label="Description"
            />
            <Input
              name="productNumber"
              value={formData.productNumber}
              onChange={handleChange}
              width="md"
              label="Product Number"
            />
          </div>
          <div className="flex gap-5">
            <Select
              width="61%"
              label="Revenue Category"
              value={formData.revenueCategory}
              onChange={handlerevnue}
              options={revnueoption}
            />
          </div>
          <div className="flex justify-end pt-6">
            <Button onClick={handleSave} disabled={loadingSubmit}>
              {loadingSubmit ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </Modal>

      <Table products={validProducts} />
    </div>
  );
}
