import Input from "../components/Input";
import { useState } from "react";
import { Row, Col, Divider, Space, Form, App, Typography } from "antd";
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
  const { modal } = App.useApp();
  const { Title } = Typography;
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

  return (
    <>
      <Config>
        <Row
          gutter={[6, 6]}
          justify="space-between"
          align="middle"
          style={{ padding: "0 8px" }}
        >
          <Col xs={24} sm={4} md={2} lg={2}>
            <Button
              type="text"
              icon={<LeftOutlined />}
              antUI={{ size: "large" }}
              style={{ backgroundColor: "#fefefe" }}
              onClick={handleclick}
            />
          </Col>

          <Col xs={24} sm={24} md={18} lg={10}>
            <Row gutter={[6, 6]} justify="end" wrap>
              <Col xs={24} sm={8} md={8} lg={8}>
                <Button
                  block
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
              <Col xs={24} sm={8} md={8} lg={8}>
                <Button
                  block
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
              <Col xs={24} sm={8} md={8} lg={8}>
                <Button
                  block
                  type="primary"
                  antUI={{ size: "large", shape: "round" }}
                  style={{ backgroundColor: "#000", color: "#fff" }}
                  className="py-3 px-8"
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
          style={{ width: 840, top: 170, title: "Create Contact" }}
          centered
        >
          <Newcustomers form={form} />
        </Modals>

        <Row gutter={[10, 10]}>
          <Col span={24}>
            <CardComponent
              style={{
                width: "100%",
                maxWidth: 1500,
                borderRadius: "10px",
                marginTop: "10px",
                borderColor: "#b9adadff",
              }}
            >
              <h1>create invoice</h1>
              <Row
                gutter={[16, 0]}
                justify="space-between"
                style={{ marginTop: "10px", padding: "0 14px" }}
              >
                <Col xs={24} sm={24} md={12} lg={5}>
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
                        <Space>
                          <Row justify="end">
                            <Col span={10}>
                              <Button
                                type="text"
                                align="center"
                                icon={<PlusOutlined />}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={handleOpen}
                              >
                                create new
                              </Button>
                            </Col>
                          </Row>
                        </Space>
                      </>
                    )}
                  />
                  <Input
                    antUI={{ size: "large" }}
                    style={{
                      width: "100%",
                      marginBottom: "16px",
                      marginTop: "5px",
                    }}
                  />
                  <Input
                    antUI={{ size: "large" }}
                    style={{ width: "100%", marginBottom: "16px" }}
                  />
                </Col>

                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={5}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                >
                  <Input
                    antUI={{ size: "large" }}
                    style={{ width: "100%", marginBottom: "16px" }}
                  />
                  <Input
                    antUI={{ size: "large" }}
                    style={{ width: "100%", marginBottom: "16px" }}
                  />
                  <Input
                    antUI={{ size: "large" }}
                    style={{ width: "100%", marginBottom: "16px" }}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "80px" }}></Row>
              <Row>
                <Col span={4}>
                  <Title level={5} type="secondary">
                    Products
                  </Title>
                  <Divider />
                </Col>
                <Col span={4}>
                  <Title level={5}>h5. Ant Design</Title>
                  <Divider />
                </Col>{" "}
                <Col span={4}>
                  <Title level={5}>h5. Ant Design</Title>
                </Col>
                <Col span={4}>
                  <Title level={5}>h5. Ant Design</Title>
                </Col>
              </Row>
            </CardComponent>
          </Col>
        </Row>
      </Config>
    </>
  );
}
