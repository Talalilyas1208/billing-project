import { useState } from "react";
import { Row, Col, Spin, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Button from "../components/Button";
import Modals from "../components/Modal";
import Table from "../components/Table";
import usefetch from "../hooks/Usefetch";
import Config from "../components/Config";
import CreateProductForm from "../components/pages/CreateProductFrom";
import { useMemo } from "react";
export default function Products() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [editingproduct, seteditingproduct] = useState(null);
  const [deleted ,setdeleted] =useState(null)
  const [form] = Form.useForm();
  const {
    data: products,
    loading: productsLoading,
    refetch: refetchProducts,
    page,
    setPage,
    limit,
  } = usefetch(`/api/products?search=${searchText}`);
  const handleopencreate = () => {
    seteditingproduct(null);
    setIsOpen(true);
  };
  const handleOpenEdit = (record) => {
    seteditingproduct(record);
    console.log(record)
    setIsOpen(true);
  };
  const handleclose = () => {
    setIsOpen(false);
    seteditingproduct(null);
  };
  const handledelete = (record) => {
   setdeleted(record)

  }
  const productColumns = useMemo(
    () => [
      {
        title: "Name",
        key: "name_group",
        render: (_, record) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{ fontWeight: 500, fontSize: "14px", color: "#1f1f1f" }}
            >
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
              size="small"
              onClick={(e) => {
                e.stopPropagation();
               handledelete(record)
              }}
            >
             Delete
            </Button>
          </span>
        ),
      },
    ],
    [],
  );
  const data = useMemo(() => {
    return Array.isArray(products?.data) ? products.data : [];
  }, [products]);

  return (
    <Config>
      <div style={{ padding: "0 24px" }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 40 }}
        >
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
              className="px-6"
            >
              <span>Create Product</span>
            </Button>
          </Col>
        </Row>
        <Modals
          isOpen={isOpen}
          onClose={handleclose}
          form={form}
          style={{
            width: 900,
            top: 170,
            title: editingproduct ? "correct product" : "Create product",
          }}
        >
          {isOpen && (
            <CreateProductForm
              refetchProducts={refetchProducts}
              onClose={handleclose}
              form={form}
              deleted={deleted}
              editingProduct={editingproduct}
            />
          )}
        </Modals>
        <Row justify="end">
          <Col span={4}>
            <Input.Search
              placeholder="Search"
              allowClear
              enterButton
              onSearch={(value) => {
                setSearchText(value);
              }}
              style={{ width: "100%" }}
            />
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
          bordered
          style={{
            borderRadius: "10px",
            border: "1px solid #d9d9d9ff",
            overflow: "scroll",
            marginTop: "18px",
          }}
        />
      </div>
    </Config>
  );
}