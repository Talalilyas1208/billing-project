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
        headerBg: '#ffffffff', 
        headerColor: '#1f1f1fff', 
   
     
        
      },
      },  
    }}
  >
    {children}
  </ConfigProvider>
);

export default Config;