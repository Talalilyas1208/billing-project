import Input from "../components/Input";
import { useState } from "react";
import { Row, Col, Divider, Space, Form, App, Typography, Table } from "antd";
import Modals from "../components/Modal";
import {
  PlusOutlined,
  HolderOutlined,
  DeleteOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Select from "../components/Select";
import CardComponent from "../components/CardComponent";
import Config from "../components/Config";
import { LeftOutlined } from "@ant-design/icons";
import Button from "../components/Button";
import Newcustomers from "../components/Newcustomers";
import { useNavigate } from "react-router-dom";

export default function Newinvoice() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { modal } = App.useApp();
  const { Title, Text } = Typography;

  // line items for the products table
  const [items, setItems] = useState([
    { id: 1, product: "", description: "", number: "", unitPrice: "" },
  ]);

  const handleOpen = () => {
    setIsOpen(true);
    setSelectOpen(false);
  };
  const handleClose = () => {
    setIsOpen(false);
    form.resetFields();
  };
  const alert = () => {
    if (!form?.isFieldsTouched()) {
      handleClose();
      return;
    }
    modal.confirm({
      title: "Confirm navigation",
      style: { top: 300 },
      content:
        "Your changes have not been saved yet. Are you sure you want to leave this page?",
      okText: "Leave this page",
      okType: "danger",
      cancelText: "No, stay",
      width: "40%",
      onOk() {
        handleClose();
      },
    });
  };
  const handleclick = () => {
    navigate("/dashboard/invoices");
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((i) => i.id)) + 1 : 1,
        product: "",
        description: "",
        number: "",
        unitPrice: "",
      },
    ]);
  };

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFieldChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const moveItem = (index, direction) => {
    setItems((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const updated = [...prev];
      [updated[index], updated[target]] = [updated[target], updated[index]];
      return updated;
    });
  };

  const columns = [
    {
      title: "",
      dataIndex: "drag",
      width: 70,
      render: (_, __, index) => (
        <Space size={4}>
          <HolderOutlined style={{ color: "#8c8c8c" }} />
          <Space direction="vertical" size={0}>
            <Button
              type="text"
              size="small"
              icon={<UpOutlined />}
              disabled={index === 0}
              onClick={() => moveItem(index, -1)}
            />
            <Button
              type="text"
              size="small"
              icon={<DownOutlined />}
              disabled={index === items.length - 1}
              onClick={() => moveItem(index, 1)}
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
          onChange={(val) => handleFieldChange(record.id, "product", val)}
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
            handleFieldChange(record.id, "description", e.target.value)
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
        <Input
          style={{ width: "100%" }}
          value={value}
          onChange={(e) =>
            handleFieldChange(record.id, "number", e.target.value)
          }
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
            handleFieldChange(record.id, "unitPrice", e.target.value)
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
          onClick={() => handleDeleteItem(record.id)}
        />
      ),
    },
  ];

  return (
    <>
      <Config>
        {/* Top Header Row */}
        <Row
          gutter={[16, 16]}
          justify="space-between"
          align="middle"
          style={{ padding: "0 8px", marginBottom: "16px" }}
        >
          <Col>
            <Button
              type="text"
              icon={<LeftOutlined />}
              antUI={{ size: "large" }}
              style={{ backgroundColor: "#fefefe" }}
              onClick={handleclick}
            />
          </Col>

          {/* Clean wrapping buttons */}
          <Col>
            <Row gutter={[8, 8]} justify="end">
              <Col>
                <Button
                  antUI={{ size: "large", shape: "round" }}
                  style={{
                    backgroundColor: "#f8f8f8ff",
                    color: "#080808ff",
                    borderColor: "#d0ceceff",
                  }}
                >
                  Approve and send
                </Button>
              </Col>
              <Col>
                <Button
                  type="outlined"
                  antUI={{ size: "large", shape: "round" }}
                  style={{
                    backgroundColor: "#f8f8f8ff",
                    color: "#000000ff",
                    borderColor: "#d0ceceff",
                    colorPrimaryHover: "#40a9ff",
                  }}
                >
                  Approve and send
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  antUI={{ size: "large", shape: "round" }}
                  style={{ backgroundColor: "#000", color: "#fff" }}
                >
                  Approve and send
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Modals
          isOpen={isOpen}
          form={form}
          alert={alert}
          style={{ width: "90%", maxWidth: 840, top: 170, title: "Create Contact" }}
          centered
        >
          <Newcustomers form={form} />
        </Modals>

        {/* Main Content Form Card */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <CardComponent
              style={{
                width: "100%",
                borderRadius: "10px",
                borderColor: "#b9adadff",
              }}
            >
              <Title level={2} style={{ textTransform: "capitalize", marginBottom: "24px" }}>
                create invoice
              </Title>

              {/* Input section mapping dynamically with Row/Col */}
              <Row gutter={[24, 16]} justify="space-between">
                <Col xs={24} sm={12} md={10} lg={8}>
                  <Row gutter={[0, 16]}>
                    <Col span={24}>
                      <Select
                        style={{ width: "100%" }}
                        antUI={{ size: "large" }}
                        placeholder="Select customer"
                        open={selectOpen}
                        onOpenChange={setSelectOpen}
                        popupRender={(menu) => (
                          <>
                            {menu}
                            <Divider style={{ margin: "8px" }} />
                            <Row justify="end" style={{ padding: "0 8px" }}>
                              <Col>
                                <Button
                                  type="text"
                                  icon={<PlusOutlined />}
                                  onMouseDown={(e) => e.preventDefault()}
                                  onClick={handleOpen}
                                >
                                  create new
                                </Button>
                              </Col>
                            </Row>
                          </>
                        )}
                      />
                    </Col>
                    <Col span={24}>
                      <Input antUI={{ size: "large" }} style={{ width: "100%" }} />
                    </Col>
                    <Col span={24}>
                      <Input antUI={{ size: "large" }} style={{ width: "100%" }} />
                    </Col>
                  </Row>
                </Col>

                <Col xs={24} sm={12} md={10} lg={8}>
                  <Row gutter={[0, 16]}>
                    <Col span={24}>
                      <Input antUI={{ size: "large" }} style={{ width: "100%" }} />
                    </Col>
                    <Col span={24}>
                      <Input antUI={{ size: "large" }} style={{ width: "100%" }} />
                    </Col>
                    <Col span={24}>
                      <Input antUI={{ size: "large" }} style={{ width: "100%" }} />
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* Dynamic spacing instead of a fixed empty row */}
              <div style={{ margin: "40px 0" }} />

              {/* Product table containing x-scroll constraint for mobile */}
              <Table
                columns={columns}
                dataSource={items}
                rowKey="id"
                pagination={false}
                bordered={false}
                scroll={{ x: "max-content" }}
                style={{ padding: "0 8px" }}
              />

              <Row style={{ padding: "16px 8px 0 8px" }}>
                <Col span={24}>
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={handleAddItem}
                    block
                  >
                    Add field
                  </Button>
                </Col>
              </Row>
            </CardComponent>
          </Col>
        </Row>
      </Config>
    </>
  );
}