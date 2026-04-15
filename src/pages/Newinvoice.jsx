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
        <CardComponent style={{width:1300}}>
          <Header> Create invoice </Header>
          <Col span={4}>
            <Input antUI={{ size: "large" }} />
          </Col>
           
           <Col span={4}>
            <Input antUI={{ size: "large" }} />
          </Col>
          <Col span={4}offset={6}>
            <Input antUI={{ size: "large" }} />
          </Col>
        </CardComponent>
      </Row>
      </Config>
    </>
  );
}
