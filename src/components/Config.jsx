import React from 'react';
import { ConfigProvider, Flex, Form } from 'antd';

const Config = ({ children}) => (
 <ConfigProvider
  theme={{
    token: {
      colorPrimary: '#108dfaff',
    

    },
    components: {
      Input: {
        activeBorderColor: '#108dfaff',
        hoverBorderColor: '#000000ff',
      },
    },
  }}
  >
   
    <Flex >
      <Form  >
        {children}
      </Form>
    </Flex>
  </ConfigProvider>
);
export default  Config ;