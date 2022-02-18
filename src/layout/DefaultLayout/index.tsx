import React, { ReactElement } from "react";
import { Layout, Menu, Image, Input, Button } from "antd";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
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
            {/* <SearchOutlined /> */}
            <Input.Search placeholder="Basic usage" />
            <Button type="primary" className="header__btn">Connect Wallet</Button>
        </div>
      </Layout.Header>
      {props.children}
    </Layout>
  );
};

export default DefaultLayout;
