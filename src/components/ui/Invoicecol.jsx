import { Col, Row } from "antd"
import Input from "../Input"

export default function Invoicecol(){
    return(
  
      <Col xs={22} sm={12} md={10} lg={24}>
                  <Row gutter={[0, 16]}>
                    <Col span={20}>
                      <Input
                        antUI={{ size: "large" }}
                        style={{ width: "100%" }}
                      />
                    </Col>
                   
                    
                  </Row>
                </Col>
            
    
    
    
    )

}