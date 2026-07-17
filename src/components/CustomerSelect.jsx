import { Row, Col, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Select from "./Select";
import Button from "./Button";
export default function CustomerSelect({ open, onOpenChange, onCreateNew }) {
  return (
    <Select
      style={{ width: "100%" }}
      antUI={{ size: "large" }}
      placeholder="Select customer"
      open={open}
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
                create new
              </Button>
            </Col>
          </Row>
        </>
      )}
    />
  );
}
