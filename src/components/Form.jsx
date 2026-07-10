import React from 'react';
import { Form, DatePicker, Space } from 'antd';
import InputTextAreas from './InputTextAreas';
import Input from './Input';
import Select from './Select';
import Button from './Button';

const ReusableForm = ({ config, onSubmit, submitText = 'Submit' }) => {
  const [form] = Form.useForm();


  const handleFinish = (values) => {
    onSubmit(values);
  };


  const renderField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <Select placeholder={field.placeholder}>
            {field.options?.map((opt) => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        );
      case 'datepicker':
        return <DatePicker style={{ width: '100%' }} />;
      case 'textarea':
        return <InputTextAreas placeholder={field.placeholder} />;
  
      default:
        return <Input placeholder={field.placeholder} />;
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      {config.map((field) => (
        <Form.Item
          key={field.name}
          label={field.label}
          name={field.name}
          rules={field.rules || []}
        >
          {renderField(field)}
        </Form.Item>
      ))}

    
    </Form>
  );
};

export default ReusableForm;
