import { Form, Row, Col } from "antd";

import Input from "../Input";
import Select from "../Select";

export default function CustomerBasicInfo({ currencyOptions, revenueOptions  }) {
  return (
    <Col span={11}>
      <Form.Item
        name="Company_name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please enter product name",
          },
        ]}
      >
        <Input
          antUI={{
            size: "large",
          }}
        />
      </Form.Item>

      <Form.Item name="CvR" label="CvR no">
        <Input
          placeholder="None"
          antUI={{
            size: "large",
          }}
        />
      </Form.Item>

      <Form.Item name="contactPersonFirstname" label="Contact person">
        <Input
          placeholder="Firstname"
          antUI={{
            size: "large",
          }}
        />
      </Form.Item>

      <Form.Item name="contactPersonSurname">
        <Input
          placeholder="Surname"
          antUI={{
            size: "large",
          }}
        />
      </Form.Item>

      <Form.Item name="contactEmail">
        <Input
          placeholder="Email"
          antUI={{
            size: "large",
          }}
        />
      </Form.Item>

      <Form.Item name="Telephone" label="Telephone">
        <Input
          placeholder="Telephone"
          antUI={{
            size: "large",
          }}
        />
      </Form.Item>

      <Form.Item name="address" label="Address">
        <Input
          placeholder="way"
          antUI={{
            size: "large",
          }}
        />
      </Form.Item>

      <Row gutter={12}>
        <Col span={8}>
          <Form.Item name="addressCurrency">
            <Select showSearch options={currencyOptions} />
          </Form.Item>
        </Col>

        <Col span={16}>
          <Form.Item name="addressCountryOrRegion">
            <Select
              className="fullWidth"
              antUI={{
                size: "large",
              }}
              options={revenueOptions}
            />
          </Form.Item>
        </Col>
      </Row>
    </Col>
  );
}
