import Table from "../components/Table";
import Input from "../components/Input";
import { useState } from "react";
import { Row, Col, Layout, Select, Divider, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { Card } from "antd";
import CardComponent from "../components/CardComponent";
import Config from "../components/Config";

export default function Newinvoice() {
  const [items, setItems] = useState(["jack", "lucy"]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName && !items.includes(trimmedName)) {
      setItems([...items, trimmedName]);
      setName("");
    } else if (items.includes(trimmedName)) {
      alert("This item already exists!");
    }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const { Header } = Layout;

  return (
    <>
      <Config>
        <CardComponent
          style={{
            width: 1300,
            borderRadius: "20px",
            borderColor: "#c7c2c2ff",
          }}
        >
          <Header>Create Invoice</Header>

          <Row
            justify="space-between"
            style={{ marginTop: "10px", padding: "0 16px" }}
          >
            <Col span={4}>
              <Select
                style={{ width: 300 }}
                placeholder="custom dropdown render"
                popupRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="Please enter item"
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addItem}
                      >
                        Add item
                      </Button>
                    </Space>
                  </>
                )}
                options={items.map((item) => ({ label: item, value: item }))}
              />
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px" }}
              />
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px" }}
              />
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px" }}
              />
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px" }}
              />
            </Col>

            <Col
              span={5}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px" }}
              />
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px" }}
              />
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px" }}
              />
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px", width: "100%" }}
              />
            </Col>
          </Row>
        </CardComponent>
      </Config>
    </>
  );
}
