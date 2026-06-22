import { useState } from "react";
import { Row, Col, Spin, Form, Input } from "antd";
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
  const [form] = Form.useForm();
  const [page, setpage] = useState(1);
  const [limit] = useState(5);

  const {
    data: products,
    loading: productsLoading,
    refetch: refetchProducts,
  } = usefetch(
    `/api/products?page=${page}&limit=${limit}&search=${searchText}`,
  );
  //   const productColumns = [
  //   {
  //     title: "Product Name",
  //     dataIndex: "productname",
  //     key: "productname",
  //   },

  //   {
  //     title: "Price",
  //     dataIndex: "price",
  //     key: "price",
  //     render: (_, record) => `${record.price} ${record.currency}`,
  //   },
  //   {
  //     title: "Product Number",
  //     dataIndex: "productNumber",
  //     key: "productNumber",
  //   },
  //   {
  //     title: "Supplier",
  //     dataIndex: "supplier",
  //     key: "supplier",
  //   },
  //   {
  //     title:"Revenue Category",
  //         dataIndex:"revenueCategory" ,
  //         key:"revenueCategory"

  //   },
  //   {
  //     dataIndex:"currency",
  //     title:"Currency",
  //     key:"currency"
  //   }
  // ];

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
              {record.productname}
            </span>
            <span style={{ fontSize: "12px", color: "#8c8c8c" }}>
              {record.productNumber}
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
          </span>
        ),
      },
    ],
    [],
  );
  const data = useMemo(() => {
    return Array.isArray(products.data) ? products.data : [];
  }, [products.data]);

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
            <Button onClick={() => setIsOpen(true)}  antUI={"bg-black text-white py-2 px-1 rounded-full w-35 h-14"} >
              Create Product
            </Button>
          </Col>
        </Row>

        <Modals
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          form={form}
          style={{ width: 800, top: 150, title: "create product" }}
        >
          {isOpen && (
            <CreateProductForm
              refetchProducts={refetchProducts}
              onClose={() => setIsOpen(false)}
              form={form}
            />
          )}
        </Modals>
        <Row justify="end">
          <Col span={8}>
            <Input.Search
              placeholder="products..."
              allowClear
              enterButton
              onSearch={(value) => {
                setSearchText(value);
                setpage(1);
              }}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>

        {productsLoading ? (
          <div style={{ textAlign: "center", marginTop: 50, padding: "50px" }}>
            <Spin size="large" description="Fetching products..." />
          </div>
        ) : (
          <Table
            data={data}
            columns={productColumns}
            pagination={{
              current: page,
              pageSize: limit,
              total: products?.totalItems || 0,
              onChange: (p) => setpage(p),
              position: ["bottomRight"],
            }}
            bordered
            style={{
              borderRadius: "12px",
              border: "1px solid #d0d0d0",
              overflow: "hidden",
              marginTop: "20px",
            }}
          />
        )}
      </div>
    </Config>
  );
}
