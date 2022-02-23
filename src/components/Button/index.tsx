import React from "react";
import { Button as AntdButton } from "antd";
import "./index.scss";

type ButtonProps = {
    content: React.ReactChild,
    bgColor?: string,
    className?: string,
    width?: string,
    maxWidth?: string,
    padding?: string,
    fontSize?: string
};

const Button: React.FC<ButtonProps> = (props) => {
    const { 
      content, 
      className = "", 
      bgColor = "#3156DB", 
      width = "180px",
      padding = "30px 50px",
      maxWidth = "180px",
      fontSize = "22px"
  } = props;
  return (
    <AntdButton className={`override-btn ${className}`} style={{
        backgroundColor: `${bgColor}`,
        border: 'none',
        color: 'white',
        width: `${width}`,
        padding: `${padding}`,
        maxWidth: `${maxWidth}`,
        fontSize: `${fontSize}`
    }}>
        {content}
    </AntdButton>
  );
};

export default Button;
