import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Image, Layout, Menu } from "antd";
import React, { ReactElement } from "react";
import "./index.scss";

const DefaultLayout: React.FC = (props): ReactElement => { 
  return (
    <Layout className="container">
      <Layout.Header className="header">
        <div className="header__left">
          <Image
            width={90}
            src="/icon/logo.svg"
            preview={false}
            className="header__logo"
          />
          <Menu mode="horizontal" selectable={false} className="header__menu">
            <Menu.Item
              key="1"
              icon={<CaretDownOutlined />}
              className="menu__icon"
            >
              Donate for
            </Menu.Item>
            <Menu.Item key="2" className="menu__icon">
              How it works
            </Menu.Item>
            <Menu.Item key="3" className="menu__icon">
              About us
            </Menu.Item>
          </Menu>
        </div>
        <div className="header__right">
        <Button className="connect-btn">Launch App</Button>;
        </div>
      </Layout.Header>
      {props.children}
    </Layout>
  );
};

export default DefaultLayout;
