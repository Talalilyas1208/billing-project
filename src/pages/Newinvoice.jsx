
import Input from "../components/Input";
import { useState, useRef } from "react";
import { Row, Col, Divider, Space, Form } from "antd";
import Modals from "../components/Modal";
import { PlusOutlined } from "@ant-design/icons";
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
  const handleOpen = () => {
    setIsOpen(true);
    setSelectOpen(false);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleclick = () => {
    navigate("/dashboard/invoices");
  };
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
              onClick={handleclick}
            />
          </Col>
          <Col span={2} offset={11}>
            <Button
              type="primary"
              antUI={{ size: "large", shape: "round" }}
              style={{ backgroundColor: "#000", color: "#fff" }}
              className="py-3 px-8"
            >
              Approve and send
            </Button>
          </Col>
          <Col span={2} offset={1}>
            <Button
              type="outlined"
              antUI={{ size: "large", shape: "round" }}
              style={{
                backgroundColor: "#f8f8f8ff",
                color: "#000000ff",
                borderColor: "#d0ceceff",
                colorPrimaryHover: "#40a9ff",
              }}
              className="py-3 px-8"
            >
              Approve and send
            </Button>
          </Col>
          <Col span={2} offset={1}>
            <Button
              antUI={{ size: "large", shape: "round", color: "black" }}
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
        <Modals
          isOpen={isOpen}
          onClose={handleClose}
          style={{ width: 840, top: 170, title: "Create product" , }}
        >
          <p>Modal content goes here...</p>
          <Newcustomers  form={form} />
        </Modals>
        <CardComponent
          style={{
            width: 1400,
            borderRadius: "10px",
            marginTop: "10px",
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
                open={selectOpen}
               onOpenChange={setSelectOpen}
                popupRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px" }} />
                    <Space style={{ padding: "0 29px 4px" }}>
                      <Button
                        type="text"
                        align="center"
                        icon={<PlusOutlined />}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleOpen}
                      >
                        create new
                      </Button>
                    </Space>
                  </>
                )}
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
