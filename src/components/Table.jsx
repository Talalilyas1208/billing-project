


import { Table as AntTable } from "antd";

export default function Table({ data, columns, loading }) {
  if (!data || data.length === 0) {
    return (
      <div className="mt-32 text-center">
        <p className="text-xl text-gray-400 font-medium">No data available</p>
      </div>
    );
  }

  return (
    <div className="custom-table-wrapper">
      <AntTable
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        loading={loading}
        bordered={false} // We handle the outer border in the wrapper
      />

      <style jsx global>{`
        /* 1. The Outer Container (Rounded corners & thin border) */
        .custom-table-wrapper {
          border: 1px solid #e8e8e8;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
        }

        /* 2. Remove Header Background (Make it white like the screenshot) */
        .ant-table-thead > tr > th {
          background: #ffffff !important;
          color: #262626 !important;
          font-weight: 500 !important;
          border-bottom: 1px solid #f0f0f0 !important;
          padding: 16px 24px !important;
        }

        /* 3. Style the Rows and Cells */
        .ant-table-tbody > tr > td {
          padding: 16px 24px !important;
          border-bottom: 1px solid #f0f0f0 !important;
          vertical-align: top; /* Matches the top-aligned text in your image */
        }

        /* 4. Remove the very last border so it doesn't clash with the rounded corner */
        .ant-table-tbody > tr:last-child > td {
          border-bottom: none !important;
        }

        /* 5. Hide the column resize/filter lines if any */
        .ant-table-thead > tr > th::before {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
















