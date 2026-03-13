import { Table as AntTable } from "antd";

export default function Table({ data, columns, loading }) {
  if (!data || data.length === 0) {
    return (
      <div className="mt-32 text-center">
        <p className="text-xl text-gray-400 font-medium">
          No data available
        </p>
      </div>
    );
  }

  return (
    <AntTable
      dataSource={data}
      columns={columns}
      rowKey="id"
      loading={loading}
    />
  );
}