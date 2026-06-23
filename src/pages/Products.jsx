import { useState, useMemo, useEffect, useRef } from 'react';
import { Row, Col, Spin, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

import Button from '../components/Button';
import Table from '../components/Table';
import usefetch from '../hooks/Usefetch';
import Config from '../components/Config';
import Modal from '../components/Modal';
import CreateProductForm from '../components/pages/CreateProductFrom';

export default function Products() {
  const [searchText, setSearchText] = useState('');
  const [page, setpage] = useState(1);
  const [limit] = useState(5);
  const [refreshKey, setRefreshKey] = useState(0);
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const wasModalOpen = useRef(false);

  const opens = location.pathname.endsWith('/createproduct');

  useEffect(() => {
    console.log(wasModalOpen.current,"-value")
    if (wasModalOpen.current && !opens) {
      setRefreshKey((k) => k + 1);
      console.log(refreshKey,"----1-")
    }
    wasModalOpen.current = opens;
  }, [opens]);

  const { data: products, loading: productsLoading } = usefetch(
    `/api/products?page=${page}&limit=${limit}&search=${searchText}&_r=${refreshKey}`
  );

  const productColumns = useMemo(
    () => [
      {
        title: 'Name',
        key: 'name_group',
        render: (_, record) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 500, fontSize: '14px', color: '#1f1f1f' }}>
              {record.productname}
            </span>
            <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
              {record.productNumber}
            </span>
          </div>
        ),
      },
      {
        title: 'Account',
        dataIndex: 'revenueCategory',
        key: 'revenueCategory',
        render: (text) => (
          <span style={{ color: '#1f1f1f' }}>{text || 'Sales'}</span>
        ),
      },
      {
        title: 'Price',
        key: 'price',
        align: 'right',
        render: (_, record) => (
          <span style={{ color: '#1f1f1f' }}>
            {record.price ? `${Number(record.price).toFixed(2)} ${record.currency}` : ''}
          </span>
        ),
      },
    ],
    []
  );

  const handleCreateProduct = () => {
    navigate('/dashboard/products/createproduct');
  };

  const handleclose = () => {
    navigate('/dashboard/products');
  };
  const handledone = () => {
    form.resetFields();
    navigate('/dashboard/products');
  };

  const data = useMemo(() => {
    return Array.isArray(products?.data) ? products.data : [];
  }, [products]);

  return (
    <Config>
      <div style={{ padding: '0 24px' }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 40 }}>
          <Col>
            <h1 style={{ fontSize: 32, fontWeight: 600 }}>Products</h1>
          </Col>
          <Col>
            <Button
              onClick={handleCreateProduct}
              icon={<PlusOutlined />}
              type="primary"
              antUI={{ size: 'large' }}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '9999px',
                height: 48,
              }}
              className="px-6"
            >
              Create Product
            </Button>
          </Col>
        </Row>

        <Row justify="end">
          <Col span={4}>
            <Input.Search
              placeholder="Search"
              allowClear
              enterButton
              onSearch={(value) => {
                setSearchText(value);
                setpage(1);
              }}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>

        {productsLoading ? (
          <div style={{ textAlign: 'center', marginTop: 50, padding: '50px' }}>
            <Spin size="large" description="Fetching products..." />
          </div>
        ) : (
          <Table
            data={data}
            columns={productColumns}
            pagination={{
              current: page,
              pageSize: limit,
              total: products?.totalItems || 0,
              onChange: (p) => setpage(p),
              position: ['bottomRight'],
            }}
            bordered
            style={{
              borderRadius: '10px',
              border: '1px solid #d9d9d9ff',
              overflow: 'scroll',
              marginTop: '18px',
            }}
          />
        )}
      </div>

      <Modal
        isOpen={opens}
        onClose={handleclose}
        form={form}
        style={{ width: 900, top: 40, title: 'Create Product' }}
      >
        <CreateProductForm form={form} onClose={handledone} />
      </Modal>
    </Config>
  );
}