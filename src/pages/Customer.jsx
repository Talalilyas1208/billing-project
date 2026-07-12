import { useState, useMemo } from "react";
import { Row, Col, Form, Input} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Button from "../components/Button";
import Modals from "../components/Modal";
import Table from "../components/Table";
import usefetch from "../hooks/Usefetch";
import useConfirmNavigation from "../utils/useConfirmNavigation";
import NewCustomers from "../components/pages/NewCustomers";
// import Testing from "../components/Testing";
export default function Products() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  const confirmNavigation = useConfirmNavigation(form);
  const {
    data: products,
    loading: productsLoading,

    refetch: refetchCustomers,
    request,
    page,
    setPage,
    limit,
  } = usefetch(`/api/contact?search=${searchText}`);
  const handleopencreate = () => {
    setIsOpen(true);
  };

  const handleclose = () => {
    setIsOpen(false);
    if (isOpen) {
      form.resetFields();
    }
  };
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
    <div style={{ padding: "0 24px" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 40 }}>
        <Col>
          <h1 style={{ fontSize: 32, fontWeight: 600 }}>Customers</h1>
        </Col>
        <Col>
          <Button
            onClick={handleopencreate}
            icon={<PlusOutlined />}
            type="primary"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "9999px",
              height: 48,
            }}
            className="px-6"
          >
            <span>Customers</span>
          </Button>
        </Col>
      </Row>

      <Modals
        isOpen={isOpen}
        onClose={handleclose}
        alert={() => confirmNavigation(handleclose)}
        rest={{
          okText: "Done",
          zIndex: 1000,
        }}
      >
        <NewCustomers
          refetchCustomers={refetchCustomers}
          onClose={handleclose}
          form={form}
        />
      </Modals>

      <Row justify="end">
        <Col span={4}>
          <Input.Search
            placeholder="Search"
            allowClear
            enterButton
            onSearch={(value) => setSearchText(value)}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      {/* <Testing/> */}
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
