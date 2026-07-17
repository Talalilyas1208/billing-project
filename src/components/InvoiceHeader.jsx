import { Row, Col, Space, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Button from "./Button";

const { Title } = Typography;
export default function InvoiceHeader({ onBack, onApproveAndSend }) {
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
          <Col>
            <Button
              size="large"
              shape="round"
              style={{
                backgroundColor: "#f8f8f8ff",
                color: "#080808ff",
                borderColor: "#d0ceceff",
              }}
              onClick={onApproveAndSend}
            >
              Approve and send
            </Button>
          </Col>
          <Col>
            <Button
              type="outlined"
              size="large"
              shape="round"
              style={{
                backgroundColor: "#f8f8f8ff",
                color: "#000000ff",
                borderColor: "#d0ceceff",
              }}
              onClick={onApproveAndSend}
            >
              Approve and send
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              shape="round"
              style={{ backgroundColor: "#000", color: "#fff" }}
              onClick={onApproveAndSend}
            >
              Approve and send
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
