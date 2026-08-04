import { Row, Col, Space, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Button from "../Button";
import { useGetapprovebuttonQuery } from "../../store/apiSlice";

const { Title } = Typography;

const buttonStyles = [
  {
    style: {
      backgroundColor: "#f8f8f8ff",
      color: "#080808ff",
      borderColor: "#d0ceceff",
    },
  },
  {
    type: "outlined",
    style: {
      backgroundColor: "#f8f8f8ff",
      color: "#000000ff",
      borderColor: "#d0ceceff",
    },
  },
  {
    type: "primary",
    style: { backgroundColor: "#000", color: "#fff" },
  },
];

export default function InvoiceHeader({ onBack, onApproveAndSend }) {
  const { data: approveButtons } = useGetapprovebuttonQuery();
  const buttons = Array.isArray(approveButtons)
    ? approveButtons
    : approveButtons?.data || [];

  return (
    <Row
      gutter={[12, 16]}
      justify="space-between"
      align="middle"
      style={{ padding: "0 8px", marginBottom: "16px" }}
    >
      <Col>
        <Space align="center" size={12}>
          <Button
            type="text"
            icon={<LeftOutlined />}
            size="large"
            style={{ backgroundColor: "#fefefe" }}
            onClick={onBack}
          />
          <Title level={2} style={{ textTransform: "capitalize", margin: 0 }}>
            create invoice
          </Title>
        </Space>
      </Col>

      <Col>
        <Row gutter={[8, 8]} justify="end">
          {buttons.length > 0 ? (
            buttons.map((button, index) => {
              const config = buttonStyles[index % buttonStyles.length] || buttonStyles[0];

              return (
                <Col key={button.id ?? `${button.label}-${index}`}>
                  <Button
                    type={config.type}
                    size="large"
                    shape="round"
                    style={config.style}
                    onClick={onApproveAndSend}
                  >
                    {button.label}
                  </Button>
                </Col>
              );
            })
          ) : (
            <Col>
              <Button
                type="primary"
                size="large"
                shape="round"
                style={{ backgroundColor: "#000", color: "#fff" }}
                onClick={onApproveAndSend}
              >
                Approve
              </Button>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
}
