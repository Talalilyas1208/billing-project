import { Row, Col, Space, Typography, Divider } from "antd";
import { PlusOutlined, HolderOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import ProductSelectCell from "./ProductSelectCell";
import QuantityCell from "./QuantityCell";
import TotalCell from "./TotalCell";
import RowActionsCell from "./RowActionsCell";
import Button from "../Button";

const { Title } = Typography;

export function getInvoiceItemsColumns({
  items,
  productOptions,
  onMoveItem,
  onProductChange,
  onCreateNew,
  onDescriptionChange,
  onNumberChange,
  onUnitPriceChange,
  onDeleteItem,
}) {
  return [
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
        <ProductSelectCell
          value={value}
          options={productOptions}
          onChange={(val) => onProductChange(record.id, val)}
          onCreateNew={() => onCreateNew(record.id)}
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
        <input
          value={value}
          onChange={(e) => onDescriptionChange(record.id, e.target.value)}
          style={{ width: "100%", height: 42, padding: 8, borderRadius: 4, border: "1px solid #d9d9d9" }}
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
        <QuantityCell
          value={value}
          onChange={(val) => onNumberChange(record.id, val)}
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
        <input
          value={value}
          onChange={(e) => onUnitPriceChange(record.id, e.target.value)}
          style={{ width: "100%", height: 42, padding: 8, borderRadius: 4, border: "1px solid #d9d9d9" }}
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
      render: (_, record) => (
        <TotalCell number={record.number} unitPrice={record.unitPrice} />
      ),
    },
    {
      title: "",
      dataIndex: "action",
      width: 60,
      render: (_, record) => (
        <RowActionsCell onDelete={() => onDeleteItem(record.id)} />
      ),
    },
  ];
}
