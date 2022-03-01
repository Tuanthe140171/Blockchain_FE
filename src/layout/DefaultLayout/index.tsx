import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Image, Layout, Menu } from "antd";
import { BigNumber } from "bignumber.js";
import React, { ReactElement } from "react";
import { UnsupportedChainIdError, useWeb3React } from "web3-react-core";
import { injected } from "../../connectors";
import { CHAIN_INFO } from "../../constants/chainInfo";
import { SupportedChainId } from "../../constants/chains";
import { useNativeCurrencyBalances } from "../../hooks/useCurrencyBalance";
import { shortenAddress } from "../../utils";
import "./index.scss";



const DefaultLayout: React.FC = (props): ReactElement => {
  const { activate, account, chainId, error } = useWeb3React();
  const userBalance = useNativeCurrencyBalances(account);

  const {
    logoUrl,
    label,
    nativeCurrency: { symbol: nativeCurrencySymbol },
  } = CHAIN_INFO[chainId ? chainId as SupportedChainId : SupportedChainId.CHARITY];

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
        <Button className="go-to-dashboard">
          Launch App
        </Button>
      </>) 
    } else if (error) {
      return (
        <div className="wrong-network">
          <Image src="/icon/wrong-network.svg" />
          <p className="wrong-network__txt">{error instanceof UnsupportedChainIdError ? "Wrong Network": "Error"}</p>
        </div>
      )
    } 
      
    return <Button className="connect-btn" onClick={handleBtnConnect}>Connect Wallet</Button>;
  }

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
          {/* <div className="search">
            <Input className="search__input" placeholder="" />
            <Button className="search__btn" type="default" shape="circle" icon={<SearchOutlined />} />
          </div> */}
          {
            renderWeb3Account()
          }
        </div>
      </Layout.Header>
      {props.children}
    </Layout>
  );
};

export default DefaultLayout;
