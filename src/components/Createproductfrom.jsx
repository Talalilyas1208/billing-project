import { Row, Col, Space } from "antd";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import Multilineinput from "./Multilineinput";
import Numbersinput from "./Numbersinput";

export default function Createproductfrom(props) {
  const {
    formData,
    handleChange,
    handleCurrencyChange,
    handleRevenueChange,
    currencyOptions,
    revenueOptions,
    handleSave,
    loadingSubmit,
  } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ fontSize: 22 }}>Create Product</h2>

      <Row gutter={16}>
        <Col span={14}>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Input
                label="Name"
                name={"productname"}
                value={formData.productname}
                onChange={handleChange}
                antUI={{ size: "large" }}
                className="shadow-md rounded-md w-full"
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  borderRadius: "0.5rem",
                  width: "100%",
                }}
              />
            </Col>

            <Col span={24}>
              <Multilineinput
                label={"Description"}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={"None"}
                antUI={{ row: "2" }}
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  borderRadius: "0.5rem",
                  width: "100%",
                }}
              />
            </Col>

            <Col span={24}>
              <Select
                showSearch
                label={"Revenue Category"}
                value={formData.revenueCategory}
                onChange={handleRevenueChange}
                options={revenueOptions}
              />
            </Col>
          </Row>
        </Col>

        <Space size="middle"></Space>

        <Col span={10}>
          <Row gutter={[23, 16]}>
            <Col span={16}>
              <Numbersinput
                label="Price"
                name="price"
                value={formData.price}
                showControls={false}
                onChange={handleChange}
                antUI={{
                  size: "large",

                  precision: 2,
                }}
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  borderRadius: "0.5rem",
                  width: "100%",
                }}
              />
            </Col>

            <Col span={8}>
              <Select
                showSearch
                label={"Currency"}
                value={formData.currency}
                onChange={handleCurrencyChange}
                options={currencyOptions}
              />
            </Col>

            <Col span={24}>
              <Input
                label={"Product Number"}
                name="productNumber"
                value={formData.productNumber}
                onChange={handleChange}
                antUI={{ size: "large" }}
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  borderRadius: "0.5rem",
                  width: "100%",
                }}
              />
            </Col>

            <Col span={24}>
              <Input
                label={"Supplier Product Number"}
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                antUI={{ size: "large", width: "80%" }}
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  borderRadius: "0.5rem",
                  width: "100%",
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleSave} disabled={loadingSubmit}>
          {loadingSubmit ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
