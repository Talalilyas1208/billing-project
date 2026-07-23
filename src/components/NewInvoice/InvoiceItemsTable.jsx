import { useMemo, useEffect } from "react";
import { Row, Col, Space, Typography, InputNumber } from "antd";
import {
  PlusOutlined,
  HolderOutlined,
  DeleteOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Table from "../Table";
import Select from "../Select";
import Input from "../Input";
import Button from "../Button";
import usefetch from "../../hooks/Usefetch";

const { Title, Text } = Typography;

export default function InvoiceItemsTable({
  items,
  onFieldChange,
  onDeleteItem,
  onMoveItem,
  onAddItem,
}) {
  const { data: productsdata } = usefetch("/api/products");

  const productList = productsdata?.data || [];

  const productOptions = useMemo(
    () =>
      productList.map((p) => ({
        label: p.productname,
        value: p.id,
      })),
    [productList],
  );

  const handleProductChange = (recordId, productId) => {
    const selectedProduct = productList.find((p) => p.id === productId);

    onFieldChange(recordId, "product", productId);

    if (selectedProduct) {
      onFieldChange(recordId, "description", selectedProduct.description || "");
      onFieldChange(recordId, "unitPrice", selectedProduct.price ?? "");
    }
  };
  useEffect(() => {
    items.forEach((item) => {
      const total = Number(item.number || 0) * Number(item.unitPrice || 0);
      if (item.total !== total) {
        onFieldChange(item.id, "total", total);
      }
    });
  }, [items]);

  const grandTotal = items.reduce(
    (sum, item) =>
      sum + Number(item.number || 0) * Number(item.unitPrice || 0),
    0,
  );

  // Only show grand total once at least one product has been selected
  const hasProduct = items.some((item) => item.product);

  const columns = [
    {
      title: "",
      dataIndex: "drag",
      width: 70,
      render: (_, __, index) => (
        <Space size={2}>
          <HolderOutlined style={{ color: "#8c8c8c" }} />
          <Space orientation="vertical" size={0}>
            <Button
              type="text"
              size="small"
              icon={<UpOutlined />}
              disabled={index === 0}
              onClick={() => onMoveItem(index, -1)}
            />
            <Button
              type="text"
              size="small"
              icon={<DownOutlined />}
              disabled={index === items.length - 1}
              onClick={() => onMoveItem(index, 1)}
            />
          </Space>
        </Space>
      ),
    },
    {
      title: (
        <Title level={5} type="secondary" style={{ margin: 0 }}>
          Products
        </Title>
      ),
      dataIndex: "product",
      width: 200,
      render: (value, record) => (
        <Select
          style={{ width: "100%" }}
          value={value || undefined}
          placeholder="Select product"
          options={productOptions}
          onChange={(val) => handleProductChange(record.id, val)}
        />
      ),
    },
    {
      title: (
        <Title level={5} type="secondary" style={{ margin: 0 }}>
          Description
        </Title>
      ),
      dataIndex: "description",
      render: (value, record) => (
        <Input
          style={{ width: "100%" }}
          value={value}
          onChange={(e) =>
            onFieldChange(record.id, "description", e.target.value)
          }
        />
      ),
    },
    {
      title: (
        <Title level={5} type="secondary" style={{ margin: 0 }}>
          Number
        </Title>
      ),
      dataIndex: "number",
      width: 110,
      render: (value, record) => (
        <InputNumber
          style={{ width: "100%", height: 42 }}
          min={0}
          value={value || 0}
          onChange={(val) => onFieldChange(record.id, "number", val)}
        />
      ),
    },
    {
      title: (
        <Title level={5} type="secondary" style={{ margin: 0 }}>
          Unit price
        </Title>
      ),
      dataIndex: "unitPrice",
      width: 130,
      render: (value, record) => (
        <Input
          style={{ width: "100%" }}
          value={value}
          onChange={(e) =>
            onFieldChange(record.id, "unitPrice", e.target.value)
          }
        />
      ),
    },
    {
      title: (
        <Title level={5} type="secondary" style={{ margin: 0 }}>
          Total
        </Title>
      ),
      dataIndex: "total",
      width: 110,
      render: (_, record) => {
        const total = Number(record.number || 0) * Number(record.unitPrice || 0);
        return <Text>{total ? total.toFixed(2) : "0.00"}</Text>;
      },
    },
    {
      title: "",
      dataIndex: "action",
      width: 60,
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => onDeleteItem(record.id)}
        />
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={items}
        rowKey="id"
        pagination={false}
        bordered={false}
        scroll={{ x: "max-content" }}
        style={{ padding: "0 8px" }}
      />
      <Row style={{ padding: "16px 8px 0 8px" }}>
        <Col span={1}>
          <Button
            type="text"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onAddItem}
            block
          />
        </Col>
        <Col span={1} />
      </Row>
      {hasProduct && (
        <Row justify="end" style={{ padding: "16px 8px 0 8px" }}>
          <Col>
            <Space size={12}>
              <Text strong>Grand Total:</Text>
              <Text strong>{grandTotal.toFixed(2)}</Text>
            </Space>
          </Col>
        </Row>
      )}
    </>
  );
}