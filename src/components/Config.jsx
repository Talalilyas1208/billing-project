import React from "react";
import { ConfigProvider } from "antd";
const Config = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#001b67ff",
      },
      components: {
        Input: {
          activeBorderColor: "#108dfaff",
          hoverBorderColor: "#000000ff",
        },
        InputNumber: {
          activeBorderColor: "#108dfaff",
          hoverBorderColor: "#000000ff",
        },
        Table: {
          headerBg: "#ffffffff",
          headerColor: "#2b2b2bff",
        },
        Menu: {
          containerBg: "#f5f5f5",
          itemSelectedBg: "#e6e6e6ff",
          itemSelectedColor: "#000000ff",
          itemHoverColor: "#000000ff",
          itemHoverBg: "#c5c3c3ff",
          itemActiveBg: "#c5c3c3ff",
          itemSelectedBorderFontSize: 0,
          activeBarBorderWidth: 4,
          itemBorderRadius: 4,
        },
      },
    }} >
    {children}
  </ConfigProvider>
);

export default Config;
