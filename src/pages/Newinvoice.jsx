import Table from "../components/Table";
import Input from "../components/Input";
import { useState } from "react";
import { Row, Col, Layout, Divider, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRef } from "react";
import Select from "../components/Select";
import CardComponent from "../components/CardComponent";
import Config from "../components/Config";
import { LeftOutlined } from "@ant-design/icons";
import Button from "../components/Button";
export default function Newinvoice() {
  const [items, setItems] = useState(["jack", "lucy"]);
  const [name, setName] = useState("");

  const addItem = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName && !items.includes(trimmedName)) {
      await Promise.all([setItems([...items, trimmedName]), setName("")]);
    }
  };
  return (
    <>
      <Config>
        <Row>
          <Col span={2}>
            <Button  type="text" ><LeftOutlined /></Button>
          </Col>
          <Col span={2} offset={12}>
            <Button
              antUI={"bg-black text-white py-3 px-8 rounded-md "}> 
            </Button>
          </Col>
        </Row>
        <CardComponent
          style={{
            width: 1400,
            borderRadius: "10px",
            marginTop: "10px ",
            borderColor: "#b9adadff",
          }}>
          <h1>create invoice</h1>
          <Row
            justify="space-between"
            style={{ marginTop: "10px", padding: "0 16px" }}>
            <Col span={4}>
              <Select
                placeholder="Select customer"
                popupRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
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
                style={{ marginBottom: "16px", marginTop: "5px" }}
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
              <Col>
                <Input
                  antUI={{ size: "large" }}
                  style={{ marginBottom: "16px" }}
                />
              </Col>

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
