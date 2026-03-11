import { useState } from "react";
import { Row, Col } from "antd";
import Button from "../components/Button";
import Modals from "../components/Modal";
import Table from "../components/Table";
import usefetch from "../Hooks/usefetch";
import Config from "../components/Config";
import Createproductfrom from "../components/Createproductfrom";

export default function Products() {

  const [isOpen, setIsOpen] = useState(false);

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

     <Modals 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          title="Add New Product"
        >
          
           <Createproductfrom 
           
           
            refetchProducts={refetchProducts}
            onClose={() => setIsOpen(false)}
          />
        </Modals>

        <Table products={validProducts} />
      </div>
    </Config>
  );
}