import { useState, useMemo } from "react";
import { Row, Col, Form, Input, App, Flex, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Button from "../components/Button";
import Modals from "../components/Modal";
import Table from "../components/Table";
import usefetch from "../hooks/Usefetch";
import MangeProductForm from "../components/pages/MangeProductForm";
import useConfirmNavigation from "../utils/useConfirmNavigation";
import styles from "../components/App.module.css";

const { Title } = Typography;

export default function Products() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [editingproduct, seteditingproduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [form] = Form.useForm();
  const [statetouch, settouch] = useState(false);
  const { modal } = App.useApp();
  const {
    data: products,
    loading: productsLoading,
    refetch: refetchProducts,
    request,
    page,
    setPage,
    limit,
  } = usefetch(`/api/products?search=${searchText}`);

  const handleopencreate = () => {
    seteditingproduct(null);
    // form.resetFields();
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
    settouch(false);
    setIsOpen(true);
  };

  const handleclose = () => {
    setIsOpen(false);
    settouch(false);
    seteditingproduct(null);
  };

  const confirmNavigation = useConfirmNavigation(statetouch);

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
          <Flex vertical>
            <span className={styles.productName}>{record?.productname}</span>
            <span className={styles.productNumber}>{record?.productNumber}</span>
          </Flex>
        ),
      },
      {
        title: "Account",
        dataIndex: "revenueCategory",
        key: "revenueCategory",
        render: (text) => <span className={styles.priceCell}>{text || "Sales"}</span>,
      },
      {
        title: "Price",
        key: "price",
        align: "right",
        render: (_, record) => (
          <span className={styles.priceCell}>
            {record.price ? `${Number(record.price).toFixed(2)} ${record.currency}` : ""}
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
    <div className={styles.container}>
      <Row justify="space-between" align="middle" className={styles.header}>
        <Col>
          <Title level={2} className={styles.title}>
            Products
          </Title>
        </Col>
        <Col>
          <Button
            onClick={handleopencreate}
            icon={<PlusOutlined />}
            type="primary"
            antUI={{ size: "large" }}
            className={`${styles.createBtn} px-6`}
          >
            Create Product
          </Button>
        </Col>
      </Row>

      <Modals
        isOpen={isOpen}
        onCancel={() => confirmNavigation(handleclose)}
        onClose={handleclose}
       rest={{
          ...{
            okText: "Done",
            style: {
              width: 900,
              top: 170,
              title: "Create New Product ",
            },
          },
        }}
      >
        <MangeProductForm
          refetchProducts={refetchProducts}
          onClose={handleclose}
          form={form}
          onTouch={() => settouch(true)}
          editingProduct={editingproduct}
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