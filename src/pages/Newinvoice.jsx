import Table from "../components/Table";
import Input from "../components/Input";
import { useState } from "react";
import { Row, Col, Layout } from "antd";
import { Card } from "antd";
import CardComponent from "../components/CardComponent";
import Config from "../components/Config";
export default function Newinvoice() {
  const [state, setstate] = useState();

  const { Header } = Layout;


  return (
    <>
    <Config>
      <Row gutter={16}>
        <CardComponent style={{width:1300 , borderRadius: '20px', borderColor: '#c7c2c2ff'} }>
          <Header> Create invoice </Header>
          <Col span={4} style={{}} >
            <Input antUI={{ size: "large" }} style={{marginTop:"10px"}}  />
          </Col>
           <Col span={4}>
            <Input antUI={{ size: "large", }}style={{marginTop:"10px"}} />
          </Col>
          <Col span={4}>
            <Input antUI={{ size: "large" }} style={{marginTop:"10px"}} />
          </Col>
        </CardComponent>
      </Row>
      </Config>
    </>
  );
}
