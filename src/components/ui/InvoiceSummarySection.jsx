import { Row, Col, Space, Divider, Typography } from "antd";

const { Text } = Typography;

export default function InvoiceSummarySection({ title, leftLabel, rightLabel, rightValue }) {
  return (
    <Row justify="space-between" style={{ padding: "8px 0" }}>
      <Col>
        <Text>{leftLabel}</Text>
      </Col>
      <Col>
        <Text>{rightValue}</Text>
      </Col>
    </Row>
  );
}
