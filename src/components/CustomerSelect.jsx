import { Row, Col, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Select from "./Select";
import { useEffect, useState } from "react";
import Button from "./Button";
import useFetch from "../hooks/Usefetch";
export default function CustomerSelect({ open, onOpenChange, onCreateNew }) {
  const [customerstest , setcustomer ] =useState([])
  const {data : customerss } = useFetch("/api/Customer")
useEffect(() => {
  if (Array.isArray(customerss?.data)) {
    setcustomer(
      customerss.data.map((item) => ({
        value: item.id ?? item._id,   
        label: item.Company_name,    
      })),
    );
  }
}, [customerss]);
  return (
    <Select
      style={{ width: "100%" }}
      antUI={{ size: "large" }}
      placeholder="Select customer"
      open={open}
      options={customerstest}
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
