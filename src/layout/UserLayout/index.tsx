import {
  BellOutlined,
  DashboardOutlined,
  SwapOutlined,
  TeamOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Badge, Image, Input, Layout, Menu } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { ReactElement, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../../routes";
import "./index.scss";

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const UserLayout: React.FC = (props): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }} className="main-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        color="#FFFFFF"
        className="main-layout__sider"
        theme="light"
      >
        <div className="main-layout__sider__img">
          <img src="../../icon/logo.svg" alt="" />
        </div>
        <Menu
          defaultSelectedKeys={["Dashboard"]}
          mode="inline"
          theme="light"
          className="main-layout__sider__menu"
        >
          <Menu.Item
            key="Dashboard"
            icon={<DashboardOutlined />}
            className="main-layout__sider__menu__item"
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="Donee"
            icon={<TeamOutlined />}
            className="main-layout__sider__menu__item"
          >
            Donee
          </Menu.Item>
          <Menu.Item
            key="Exchange"
            icon={<SwapOutlined />}
            className="main-layout__sider__menu__item"
          >
            Exchange Money
          </Menu.Item>
          <Menu.Item
            key="ContactF"
            icon={<WhatsAppOutlined />}
            className="main-layout__sider__menu__item"
          >
            Contact us
          </Menu.Item>
          {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout className="main-layout__site-layout">
        <Header className="main-layout__site-layout__header">
          <Search
            className="main-layout__site-layout__header__search"
            placeholder="Search donee, history..."
          />
          <div className="main-layout__site-layout__header__group-avatar">
            <p className="main-layout__site-layout__header__group-avatar__date">
              Tue, 30 Dec 2022
            </p>
            <Badge count={0} size="small" showZero>
              <BellOutlined style={{ fontSize: "20  px", color: "#ffffff" }} />
            </Badge>
            <Avatar
              src="../../assets/ava.png"
              className="main-layout__site-layout__header__group-avatar__avatar"
            />
          </div>
        </Header>
        <Content>
          <Suspense fallback={loading}>
            <Routes>
              {routes.map((route, index) => {
                return (
                  route.component && (
                    <Route
                      path={route.path}
                      element={<route.component />}
                      key={index}
                    />
                  )
                );
              })}
            </Routes>
          </Suspense>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default UserLayout;
