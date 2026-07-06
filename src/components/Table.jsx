import { Table as AntTable } from "antd";
import Config from "./Config";

export default function Table({ data, columns, loading, style, pagination }) {
  return (
    <Config>
       {!data ? (
            <Spin size="large" description="Fetching products..." />
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