import { useState } from "react";
import { Row, Col, Spin } from "antd"; // Import Spin
import Button from "../components/Button";
import Modals from "../components/Modal";
import Table from "../components/Table";
import usefetch from "../hooks/Usefetch";
import Config from "../components/Config";
import Createproductfrom from "../components/Createproductfrom";

export default function Products() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: products,
    loading: productsLoading, 
    refetch: refetchProducts,
  } = usefetch("/api/products");

  const validProducts = products?.filter((p) => p && p.productname) || [];
  return (
    <Config>
      <div style={{ padding: "0 24px" }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 40 }}>
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

          style={{ width: 800, top: 150 , title:"create product"}}
        >
          <Createproductfrom 
            refetchProducts={refetchProducts}
            onClose={() => setIsOpen(false)}
          />
        </Modals>
        <Table 
          products={validProducts} 
          loading={productsLoading} 
        />
        {productsLoading && validProducts.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Spin t="Fetching data..." />
          </div>
        )}
      </div>
    </Config>
  );
}