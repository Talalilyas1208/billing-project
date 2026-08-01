import { Row, Col, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Select from "../Select";
import Button from "../Button";
export default function Payementdeadline({
  open,
  onOpenChange,
  onCreateNew,
  customers = [],
  loading,
}) {
  const payementOptions = customers.map((item) => ({
    value: item.id ?? item._id,
    label: item.label,
  }));

  return (
    <Select
      style={{ width: "100%" }}
      antUI={{ size: "large" }}
      placeholder="Select customer"
      open={open}
      loading={loading}
      options={payementOptions}
      onOpenChange={onOpenChange}
      popupRender={(menu) => (
        <>
          {menu}

          <Divider style={{ margin: "8px" }} />

          <Row justify="end" style={{ padding: "0 8px" }}>
            <Col>
              <Button
                type="text"
                icon={<PlusOutlined />}
                onMouseDown={(e) => e.preventDefault()}
                onClick={onCreateNew}
              >
                Create New
              </Button>
            </Col>
          </Row>
        </>
      )}
    />
  );
}