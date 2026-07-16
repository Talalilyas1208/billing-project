import { useState, useMemo } from "react";
import { Row, Col, Form, Input} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Button from "../components/Button";
import Modals from "../components/Modal";
import Table from "../components/Table";
import usefetch from "../hooks/Usefetch";
import useConfirmNavigation from "../hooks/useConfirmNavigation";
import NewCustomers from "../components/pages/NewCustomers";
import styles from "../components/App.module.css"
export default function Products() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();
    const [statetouch, settouch] = useState(false);

  const confirmNavigation = useConfirmNavigation(statetouch);
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
      settouch(false);
    // if (isOpen) {
    //   form.resetFields();
    // }
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
            {record?.price}
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
        onCancel={() => confirmNavigation(handleclose)}
         destroyOnHidden
        rest={{
          ...{
            okText: "Done",
            style: {
              width: 900,
              top: 170,
              title: "Create New Customer ",
            },
          },
        }}
      >
        <NewCustomers
          refetchCustomers={refetchCustomers}
          onClose={handleclose}
           onTouch={() => settouch(true)}
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
     <Table
            data={data}
            columns={productColumns}
            loading={productsLoading}
            className={styles.table}
            rowKey="id"
            pagination={{
              current: page,
              pageSize: limit,
              total: products?.totalItems || 0,
              onChange: (p) => setPage(p),
              placement: ["bottomLeft"],
            }}
          />
    </div>
  );
}
