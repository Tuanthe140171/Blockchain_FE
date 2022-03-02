import {
  BellOutlined,
  DashboardOutlined,
  TeamOutlined,
  WhatsAppOutlined,
  SwapOutlined
} from "@ant-design/icons";
import { Badge, Image, Input, Layout, Menu, Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { ReactElement, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { UnsupportedChainIdError, useWeb3React } from "web3-react-core";
import { BigNumber } from "bignumber.js";
import { injected } from "../../connectors";
import { CHAIN_INFO } from "../../constants/chainInfo";
import { SupportedChainId } from "../../constants/chains";
import { useNativeCurrencyBalances } from "../../hooks/useCurrencyBalance";
import { shortenAddress } from "../../utils"
import { signTypedMessage, verifyTypedMessage } from "../../blockchain/signMessage";
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

  const { activate, account, chainId, error, library } = useWeb3React();
  const userBalance = useNativeCurrencyBalances(account);

  const {
    logoUrl,
    label,
    nativeCurrency: { symbol: nativeCurrencySymbol },
  } = CHAIN_INFO[chainId ? chainId as SupportedChainId : SupportedChainId.CHARITY];

  useEffect(() => {
    const requestSignature = async () => {
      if (account && library && !error) {
        const signature = await signTypedMessage(library, account);
        console.log(verifyTypedMessage(signature, account));
      }
    }

    requestSignature();
  }, [account, error, library]);

  const handleBtnConnect = () => {
    activate(injected);
  }

  const renderWeb3Account = () => {
    if (account && userBalance) {
      return (
        <>
          <div className="selected-network">
            <Image className="selected-network__icon" src={logoUrl} preview={false} />
            <p className="selected-network__txt">{label}</p>
          </div>
          <div className="connected-account">
            <p className="connected-account__balance">
              {`${new BigNumber(userBalance).toFixed(3)} ${nativeCurrencySymbol}`}
            </p>
            <div className="connected-account__addr">
              {shortenAddress(account)}
            </div>
          </div>

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
        </>)
    } else if (error) {
      return (
        <>
          <Button className="switch-network" onClick={async () => {
            try {
              // check if the chain to connect to is installed
              await (window as any).ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x7E2' }], // chainId must be in hexadecimal numbers
              });
            } catch (error: any) {
              // This error code indicates that the chain has not been added to MetaMask
              // if it is not, then install it into the user MetaMask
              if (error.code === 4902) {
                console.log("ADDING NETWORK");
                try {
                  await (window as any).ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainId: '0x7E2',
                        chainName: 'CharityVerse',
                        rpcUrls: 'http://35.208.109.149:8545',
                        blockExplorerUrls: 'https://35.206.106.18:4000"',
                        nativeCurrency: {
                          name: "CharityVerse",
                          symbol: "CRV", // 2-6 characters long
                          decimals: 18
                        }
                      },
                    ],
                  });
                } catch (addError) {
                  console.error(addError);
                }
              }
              console.error(error);
            }
          }}>
            <SwapOutlined />
            <span>Switch Network</span>
          </Button>
          <div className="wrong-network">
            <Image src="/icon/wrong-network.svg" preview={false} />
            <p className="wrong-network__txt">{error instanceof UnsupportedChainIdError ? "Wrong Network" : "Error"}</p>
          </div>
        </>
      )
    }

    return <Button className="connect-btn" onClick={handleBtnConnect}>Connect Wallet</Button>;
  }

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
            {renderWeb3Account()}
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
