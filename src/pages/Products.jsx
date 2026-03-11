import { useState } from "react";
import { Row, Col } from "antd";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Table from "../components/Table";
import usefetch from "../Hooks/usefetch";
import Config from "../components/Config";
import Createproductfrom from "../components/Createproductfrom";

export default function Products() {
  // 1. Local state only for the Modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // 2. Data fetching remains here to feed the Table and the Form options
  const {
    data: products,
    loading: productsLoading,
    refetch: refetchProducts,
  } = usefetch("/api/products");



  if ( productsLoading ) return null;
  
  



  const validProducts = products?.filter((p) => p && p.productname) || [];

  return (
    <Config>
      <div style={{ padding: "0 24px" }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 40 }}>
          <Col>
            <h1 style={{ fontSize: 32, fontWeight: 600 }}>Products</h1>
          </Col>
          <Col>
            <Button onClick={() => setIsOpen(true)} variant="product">
              Create Product
            </Button>
          </Col>
        </Row>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          
           <Createproductfrom 
           
           
            refetchProducts={refetchProducts}
            onClose={() => setIsOpen(false)}
          />
        </Modal>

        <Table products={validProducts} />
      </div>
    </Config>
  );
}