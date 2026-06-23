import React from 'react';
import { Button as AntdButton } from 'antd';

export default function Button(props) {
  const { 
    children, 
    onClick, 
    type = 'button', 
    disabled, 
    className = '', 
    style, 
    antUI = '' 
  } = props;

  return (
    <AntdButton
      type={type}
      htmlType={type} 
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`${antUI} ${className}`}
    >
      {children}
    </AntdButton>
  );
}
