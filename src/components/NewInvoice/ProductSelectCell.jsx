import { memo } from "react";
import { Row, Col, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Select from "../../Select";
import Button from "../../Button";

function ProductSelectCell({ value, options, onChange, onCreateNew }) {
  return (
    <Select
      style={{ width: "100%" }}
      value={value || undefined}
      placeholder="Select product"
      options={options}
      onChange={onChange}
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

export default memo(ProductSelectCell);
