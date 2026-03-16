import { Table as AntTable } from "antd";
import Config from "./Config";

export default function Table({ data, columns, loading,style }) {
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
    <Config>
    <AntTable
      dataSource={data}
      columns={columns}
      rowKey="id"
      pagination={{pageSize: 5 }}
      bordered
     
      scroll={{ y: 600 }}
      style={{...style}}
      tableLayout="fixed"
      loading={loading}
    />
    </Config>
  );
}