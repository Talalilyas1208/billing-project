import { useState, useMemo } from "react";
import { Row, Col, Form, Input, App } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Button from "../components/Button";
import Modals from "../components/Modal";
import Table from "../components/Table";
import usefetch from "../hooks/Usefetch";
import MangeProductForm from "../components/pages/MangeProductForm";

export default function Products() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [editingproduct, seteditingproduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [form] = Form.useForm();
  const [statetouch ,settouch] =useState(false)
  const { modal } = App.useApp();
  const {data: products,loading: productsLoading,
    refetch: refetchProducts,
    request,
    page,
    setPage,
    limit,
  } = usefetch(`/api/products?search=${searchText}`);
 
const handleopencreate = () => {
  seteditingproduct(null);
  form.resetFields();       
  setIsOpen(true);
};

const handleOpenEdit = (record) => {
  seteditingproduct(record);
  form.setFieldsValue({   
    productname: record.productname,
    description: record.description,
    revenueCategory: record.revenueCategory,
    vat: record.vat,
    price: record.price,
    currency: record.currency,
    productNumber: record.productNumber,
    supplier: record.supplier,
  });
  settouch(false)
  setIsOpen(true);
};

const handleclose = () => {
  setIsOpen(false);
  settouch(false)
 
  seteditingproduct(null);
};
   const alert = () => {
    if (!statetouch) {
      handleclose();
      return;}
    modal.confirm({
      title: "Confirm navigation",
      style: { top: 300 },
      content:"Your changes have not been saved yet. Are you sure you want to leave this page?",
      okText: "Leave this page",
      okType: "danger",
      cancelText: "No, stay",
      width: "40%",
      onOk() {
        handleclose();
      },
    });
  };
  const handledelete = (record) => {
    modal.confirm({
      title: "Delete product",
      content: `Are you sure you want to delete "${record.productname}"?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          setDeletingId(record.id);
          await request(`/api/products/${record.id}`, "DELETE");
          refetchProducts();
        } catch (err) {
          console.error("Delete failed:", err);
        } finally {
          setDeletingId(null);
        }
      },
    });
  };
  const productColumns = useMemo(
    () => [
      {
        title: "Name",
        key: "name_group",
        render: (_, record) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 500, fontSize: "14px", color: "#1f1f1f" }}>
              {record?.productname}
            </span>
            <span style={{ fontSize: "12px", color: "#8c8c8c" }}>
              {record?.productNumber}
            </span>
          </div>
        ),
      },
      {
        title: "Account",
        dataIndex: "revenueCategory",
        key: "revenueCategory",
        render: (text) => (
          <span style={{ color: "#1f1f1f" }}>{text || "Sales"}</span>
        ),
      },
      {
        title: "Price",
        key: "price",
        align: "right",
        render: (_, record) => (
          <span style={{ color: "#1f1f1f" }}>
            {record.price
              ? `${Number(record.price).toFixed(2)} ${record.currency}`
              : ""}
            <Button
              type="link"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenEdit(record);
              }}
            >
              Edit
            </Button>
            <Button
              type="link"
              danger
              size="small"
              loading={deletingId === record.id}
              onClick={(e) => {
                e.stopPropagation();
                handledelete(record);
              }}
            >
              Delete
            </Button>
          </span>
        ),
      },
    ],
    [deletingId],
  );
  const data = useMemo(() => {
    return Array.isArray(products?.data) ? products.data : [];
  }, [products]);
  return (
    <div style={{ padding: "0 24px" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 40 }}>
        <Col>
          <h1 style={{ fontSize: 32, fontWeight: 600 }}>Products</h1>
        </Col>
        <Col>
          <Button
            onClick={handleopencreate}
            icon={<PlusOutlined />}
            type="primary"
            antUI={{ size: "large" }}
            style={{
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "9999px",
              height: 48,
            }}
            className="px-6">
            <span>Create Product</span>
          </Button>
        </Col>
      </Row>
      <Modals
        isOpen={isOpen}
        form={form}
        alert={alert}
        onClose={handleclose}
        destroyOnHidden={true}
        style={{
          width: 900,
          top: 170,
          title: editingproduct ? "Update product" : "Create product", }}>
          <MangeProductForm
            refetchProducts={refetchProducts}
            onClose={handleclose}
            form={form}
            onTouch={() => settouch(true)}
            editingProduct={editingproduct}/>    
      </Modals>
      <Row justify="end">
        <Col span={4}>
          <Input.Search
            placeholder="Search"
            allowClear
            enterButton
            onSearch={(value) => setSearchText(value)}
            style={{ width: "100%" }}/>
        </Col>
      </Row>
      <Table
        data={data}
        columns={productColumns}
        loading={productsLoading}
        pagination={{
          current: page,
          pageSize: limit,
          total: products?.totalItems || 0,
          onChange: (p) => setPage(p),
          placement: ["bottomLeft"],
        }}
        style={{
          borderRadius: "10px",
          border: "1px solid #d9d9d9ff",
          overflow: "scroll",
          marginTop: "18px",
        }}
      />
    </div>
  );
}