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
      },
    }}
  >
    {children}
  </ConfigProvider>
);

export default Config;