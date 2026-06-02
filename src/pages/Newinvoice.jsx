import Table from "../components/Table";
import Input from "../components/Input";
import { useState } from "react";
import { Row, Col, Layout } from "antd";
import { Card } from "antd";
import CardComponent from "../components/CardComponent";
import Config from "../components/Config";

export default function Newinvoice() {
  const { Header } = Layout;

  return (
    <>
      <Config>
        <CardComponent
          style={{
            width: 1300,
            borderRadius: "20px",
            borderColor: "#c7c2c2ff",
          }}
        >
          <Header>Create Invoice</Header>

          <Row
            justify="space-between"
            style={{ marginTop: "10px", padding: "0 16px" }}
          >
            <Col span={4}>
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px" }}
              />
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px" }}
              />
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px" }}
              />
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px" }}
              />
            </Col>

            <Col
              span={5}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px" }}
              />
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px", }}
              />
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px"}}
              />
              <Input
                antUI={{ size: "large" }}
                style={{ marginBottom: "16px", width: "100%" }}
              />
            </Col>
          </Row>
        </CardComponent>
      </Config>
    </>
  );
}
