import Table from "../components/Table";
import Input from "../components/Input";
import { useState, useRef } from "react";
import { Row, Col, Layout, Divider, Space, Tooltip } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import Select from "../components/Select";
import CardComponent from "../components/CardComponent";
import Config from "../components/Config";
import { LeftOutlined } from "@ant-design/icons";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
export default function Newinvoice() {
  const [items, setItems] = useState(["jack", "lucy"]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate()
  const addItem = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName && !items.includes(trimmedName)) {
      await Promise.all([setItems([...items, trimmedName]), setName("")]);
    }
  };
const handlechange = (  ) => {
    navigate("/dashboard/new/createnewcustomer")
}
  return (
    <>
      <Config>
        <Row>
          <Col span={2}>
            <Button
              type="text"
              icon={<LeftOutlined />}
              antUI={{ size: "large" }}
              style={{ backgroundColor: "#fefefe" }}
            />
          </Col>
          <Col span={2} offset={11}>
            <Button
              type="primary"
              antUI={{ size: "large" }}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "9999px",
              }}
              className="py-3 px-8"
            >
              Approve and send
            </Button>
          </Col>
          <Col span={2} offset={1}>
            <Tooltip title="This is a simple text hint" trigger="hover">
              <Button
                type="default"
                antUI={{ size: "large", shape: "round" }}
                style={{
                  backgroundColor: "#f8f8f8ff",
                  color: "#000000ff",
                  borderColor: "#d0ceceff ",
                  colorPrimaryHover: "#40a9ff",
                }}
                className="py-3 px-8"
              >
                Approve and send
              </Button>
            </Tooltip>
          </Col>{" "}
          <Col span={2} offset={1}>
            <Button
              antUI={{ size: "large", shape: "round", color: "black  " }}
              style={{
                backgroundColor: "#f8f8f8ff",
                color: "#080808ff",
                borderColor: "#d0ceceff",
              }}
            >
              Approve and send
            </Button>
          </Col>
        </Row>
        <CardComponent
          style={{
            width: 1400,
            borderRadius: "10px",
            marginTop: "10px ",
            borderColor: "#b9adadff",
          }}
        >
          <h1>create invoice</h1>
          <Row
            justify="space-between"
            style={{ marginTop: "10px", padding: "0 16px" }}
          >
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
                        onClick={handlechange}
                      >
                        Add item
                      </Button>
                    </Space>
                  </>
                )}
                options={items.map((item) => ({ label: item, value: item }))}
              />

              <Input
                size="large"
                style={{ marginBottom: "16px", marginTop: "5px" }}
              />

              <Input size="large" style={{ marginBottom: "16px" }} />
            </Col>

            <Col
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
