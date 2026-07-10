import { Table as AntTable } from "antd";
import Config from "./Config";
import { Flex, Spin } from 'antd';
export default function Table({ data, columns, loading, style, pagination  ,}) {
  return (
    <Config>
       {!data ? (
            <Spin size="large" description="Loading......." />
        ) : (
      <AntTable
      
        dataSource={data}
        columns={columns}
        rowKey="id"
        scroll={{ y: 600 }}
        style={{ ...style }}
        tableLayout="fixed"
        loading={loading}
        pagination={pagination}
      />
        )
}
    </Config>
  );
}