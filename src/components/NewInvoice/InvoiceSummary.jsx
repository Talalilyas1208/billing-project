import { Row, Col, Space, Typography, Divider } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import Select from "../Select";

const { Text } = Typography;

const CURRENCY_OPTIONS = [
  { label: "DKK", value: "DKK" },
  { label: "EUR", value: "EUR" },
  { label: "USD", value: "USD" },
];

const PRICE_MODE_OPTIONS = [
  { label: "Ekskl. moms", value: "excl" },
  { label: "Inkl. moms", value: "incl" },
];

const DESIGN_OPTIONS = [
  { label: "Standardskabelon", value: "standard" },
  { label: "Moderne skabelon", value: "modern" },
  { label: "Klassisk skabelon", value: "classic" },
];

export default function InvoiceSummary({
  vatFreeAmount = 0,
  taxableAmount = 0,
  totalExcludingVat = 0,
  vat = 0,
  totalIncludingVat = 0,
  currency,
  onCurrencyChange,
  priceMode,
  onPriceModeChange,
  paymentMethods = [],
  design,
  onDesignChange,
}) {
  const formatAmount = (value) => `${Number(value || 0).toFixed(2)} ${currency || "DKK"}`;

  return (
    <>
      <Divider style={{ margin: "0 0 24px 0" }} />

      <Row justify="space-between" align="top">
        {/* Left column */}
        <Col span={12}>
          <Space direction="vertical" size={4} style={{ marginBottom: 24 }}>
            <Space size={8}>
              <Text>VAT-free amount :</Text>
              <Text strong>{formatAmount(vatFreeAmount)}</Text>
            </Space>
            <Space size={8}>
              <Text>Taxable amount :</Text>
              <Text strong>{formatAmount(taxableAmount)}</Text>
            </Space>
          </Space>

          <div style={{ marginBottom: 24 }}>
            <Space size={6} align="center" style={{ marginBottom: 4 }}>
              <Text type="secondary">Payment methods</Text>
              <FileTextOutlined style={{ color: "#8c8c8c" }} />
            </Space>
            <div>
              {paymentMethods.length > 0 ? (
                paymentMethods.map((method) => (
                  <div key={method}>
                    <Text>{method}</Text>
                  </div>
                ))
              ) : (
                <Text>Bank</Text>
              )}
            </div>
          </div>

          <div>
            <Text type="secondary" style={{ display: "block", marginBottom: 4 }}>
              Design
            </Text>
            <Select
              style={{ width: 260 }}
              value={design}
              options={DESIGN_OPTIONS}
              onChange={onDesignChange}
            />
          </div>
        </Col>

        {/* Right column */}
        <Col span={9}>
          <Row justify="space-between" style={{ padding: "8px 0" }}>
            <Col>
              <Text>Total excluding VAT</Text>
            </Col>
            <Col>
              <Text>{formatAmount(totalExcludingVat)}</Text>
            </Col>
          </Row>

          <Row justify="space-between" style={{ padding: "8px 0" }}>
            <Col>
              <Text>VAT</Text>
            </Col>
            <Col>
              <Text>{formatAmount(vat)}</Text>
            </Col>
          </Row>

          <Divider style={{ margin: "8px 0" }} />

          <Row justify="space-between" style={{ padding: "8px 0 24px 0" }}>
            <Col>
              <Text strong style={{ fontSize: 16 }}>Total incl. VAT</Text>
            </Col>
            <Col>
              <Text strong style={{ fontSize: 16 }}>{formatAmount(totalIncludingVat)}</Text>
            </Col>
          </Row>

          <Row align="middle" style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Text type="secondary">Currency</Text>
            </Col>
            <Col span={16}>
              <Select
                style={{ width: "100%" }}
                value={currency}
                options={CURRENCY_OPTIONS}
                onChange={onCurrencyChange}
              />
            </Col>
          </Row>

          <Row align="middle">
            <Col span={8}>
              <Text type="secondary">Prices are</Text>
            </Col>
            <Col span={16}>
              <Select
                style={{ width: "100%" }}
                value={priceMode}
                options={PRICE_MODE_OPTIONS}
                onChange={onPriceModeChange}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
