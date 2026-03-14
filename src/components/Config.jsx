import React from "react";
import { ConfigProvider } from "antd";

const Config = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#108dfaff",
      },
      components: {
        Input: {
          activeBorderColor: "#108dfaff",
          hoverBorderColor: "#000000ff",
        },
        InputNumber : {
            activeBorderColor: "#108dfaff",
          hoverBorderColor: "#000000ff",
        },
        Table: {
        headerBg: '#ffffffff', // Background color
        headerColor: '#1f1f1fff', // Text color
        headerSortHoverBg: '#0050b3', // Background when hovering over sortable header
        headerSortActiveBg: '#0050b3', // Background when sorted
      },
      },  
    }}
  >
    {children}
  </ConfigProvider>
);

export default Config;