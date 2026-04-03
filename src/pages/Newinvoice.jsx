import Table from "../components/Table";
import Input from "../components/Input";
import { useState } from "react";
import { Row, Col, Layout } from "antd";
import { Card } from "antd";
import CardComponent from "../components/CardComponent";
export default function Newinvoice() {
  const [state, setstate] = useState();

  const { Header } = Layout;

  return (
    <>
      <Row>
        <CardComponent style={{width:1300}}>
          <Header> </Header>
          <Col span={4}>
            <Input antUI={{ size: "large" }} />
          </Col>
        </CardComponent>
      </Row>
    </>
  );
}
