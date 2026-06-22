import Table from "../components/Table";
import Input from "../components/Input";
import { useState } from "react";
import { Row, Col, Layout, Divider, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRef } from "react";
import Select from "../components/Select";
import CardComponent from "../components/CardComponent";
import Config from "../components/Config";
import {LeftOutlined} from "@ant-design/icons"
export default function Newinvoice() {
  const [items, setItems] = useState(["jack", "lucy"]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName && !items.includes(trimmedName)) {
      await Promise.all([setItems([...items, trimmedName]), setName("")]);
    }
  };
  const { Header } = Layout;

  return (
    <>
      <Config>
        <Button icon={<LeftOutlined/>}></Button>
        <CardComponent
          style={{
            width: 1400,
            borderRadius: "10px",
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
                
                placeholder="Select customer"  popupRender={(menu) => (
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
                style={{ marginBottom: "16px",marginTop:"5px" }}
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
