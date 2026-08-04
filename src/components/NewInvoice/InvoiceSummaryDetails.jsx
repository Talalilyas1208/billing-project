import { Row, Col, Divider } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import LabeledSelectField from "../ui/LabeledSelectField";
import InvoiceSummarySection from "../ui/InvoiceSummarySection";
import Button from "../Button";
import Input from "../Input";
import { Typography } from "antd";

const { Text } = Typography;

export default function InvoiceSummaryDetails({
  vatFreeAmount,
  taxableAmount,
  totalExcludingVat,
  vat,
  totalIncludingVat,
  selectedCurrency,
  onCurrencyChange,
  currencyOptions,
  priceMode,
  priceModeOptions,
  design,
  designOptions,
  onDesignChange,
  paymentMethods,
}) {
  const formatAmount = (value) => `${Number(value || 0).toFixed(2)} ${selectedCurrency}`;

  return (
    <>
      <Divider style={{ margin: "0 0 24px 0" }} />
      <Row justify="space-between" align="top">
        <Col span={12}>
          <InvoiceSummarySection
            leftLabel="VAT-free amount :"
            rightValue={formatAmount(vatFreeAmount)}
          />
          <InvoiceSummarySection
            leftLabel="Taxable amount :"
            rightValue={formatAmount(taxableAmount)}
          />
          <div style={{ marginBottom: 24 }}>
            <Row align="middle" style={{ marginBottom: 4 }}>
              <FileTextOutlined style={{ color: "#8c8c8c", marginRight: 8 }} />
              <Text type="secondary">Payment methods</Text>
            </Row>
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
          <Input
            placeholder="Search or add note"
            antUI={{ size: "large" }}
            style={{ width: "100%" }}
          />
          <LabeledSelectField
            label="Design"
            value={design ?? undefined}
            options={designOptions}
            onChange={onDesignChange}
            style={{ width: 260 }}
          />
        </Col>
        <Col span={9}>
          <InvoiceSummarySection
            leftLabel="Total excluding VAT"
            rightValue={formatAmount(totalExcludingVat)}
          />
          <InvoiceSummarySection leftLabel="VAT" rightValue={formatAmount(vat)} />
          <Divider style={{ margin: "8px 0" }} />
          <InvoiceSummarySection
            leftLabel={<Text strong style={{ fontSize: 16 }}>Total incl. VAT</Text>}
            rightValue={<Text strong style={{ fontSize: 16 }}>{formatAmount(totalIncludingVat)}</Text>}
          />
          <LabeledSelectField
            label="Currency"
            value={selectedCurrency ?? undefined}
            options={currencyOptions}
            onChange={onCurrencyChange}
          />
          <LabeledSelectField
            label="Prices are"
            value={priceMode ?? undefined}
            options={priceModeOptions}
            onChange={() => {}}
          />
          <Button
            type="primary"
            style={{ width: "100%", marginTop: 12 }}
            antUI={{ size: "large" }}
          >
            Apply
          </Button>
        </Col>
      </Row>
    </>
  );
}
