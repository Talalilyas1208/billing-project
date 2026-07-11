import React from "react";
import { Button as AntdButton } from "antd";

export default function Button(props) {
  const {
    children,
    onClick,
    type = "default", 
    disabled,
    className = "",
    style,
    icon,
    antUI = {size: "large"}, 
    htmlType = "button",
    ...rest
  } = props;

  return (
    <AntdButton
      type={type}
      htmlType={htmlType}
      onClick={onClick}
      disabled={disabled}
      icon={icon}
      style={style}
      className={className}
      {...antUI}
      {...rest}
    >
      {children}
    </AntdButton>
  );
}