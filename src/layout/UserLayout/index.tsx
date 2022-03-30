import { BellOutlined, SwapOutlined } from "@ant-design/icons";
import { Badge, Button, Image, Input, Layout, Menu, Popover } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { BigNumber } from "bignumber.js";
import { ethers } from "ethers";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UnsupportedChainIdError, useWeb3React } from "web3-react-core";
import { CHAIN_INFO } from "../../constants/chainInfo";
import { SupportedChainId } from "../../constants/chains";
import ModalHeader from "../../containers/Modal";
import { useCharityVerseContract } from "../../hooks/useContract";
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  getBadluckerType,
  getUserById,
} from "../../stores/action/user-layout.action";
import { shortenAddress } from "../../utils";
import "./index.scss";

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const UserLayout: React.FC = (props): ReactElement => {
  const [userBalance, setUserBalance] = useState<string>("0");
  const [selectedKey, setSelectedKey] = useLocalStorage(
    "activeTab",
    "Dashboard"
  );
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const { account, chainId, error } = useWeb3React();
  const { userData } = useSelector((state: any) => state.userLayout);
  const dispatch = useDispatch();

  const avatarLink = userData?.UserMedia.find(
    (media: any) => media.type === "1" && media.active === 1
  )
    ? userData?.UserMedia.find(
        (media: any) => media.type === "1" && media.active === 1
      ).link
    : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

  // console.log();

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData.UserMedia]);

  const { data: user } = useFetch<any>(
    "users/get-user-by-id",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [],
    {},
    (e) => {
      const action = getUserById(e.data);
      dispatch(action);
    }
  );

  const { data: blkSituation } = useFetch<any>(
    "bad-lucker/get-badlucker-situation",
    {},
    false,
    [],
    { method: "GET" },
    (e) => {
      // const optionRes = e.data.map((opt: any, index: number) => {
      //   return {
      //     value: opt.name,
      //     label: opt.name,
      //     index: index,
      //     message: opt.message,
      //     id: opt.id,
      //   };
      // });
      // setOptions(optionRes);d
      const action = getBadluckerType(e.data);
      dispatch(action);
    }
  );

  const charityContract = useCharityVerseContract();

  useEffect(() => {
    let interval: any;

    const getCRVBalance = async () => {
      const balance = await charityContract.balanceOf(account);
      setUserBalance(ethers.utils.formatEther(balance));

      interval = setInterval(async () => {
        const balance = await charityContract.balanceOf(account);
        setUserBalance(ethers.utils.formatEther(balance));
      }, 10000);
    };

    charityContract && account && getCRVBalance();

    return () => {
      clearInterval(interval);
    };
  }, [charityContract, account]);

  const {
    logoUrl,
    label,
    nativeCurrency: { symbol: nativeCurrencySymbol },
  } = CHAIN_INFO[
    chainId ? (chainId as SupportedChainId) : SupportedChainId.CHARITY
  ];

  const getDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = today.toLocaleString("default", { month: "short" });
    const dd = today.getDate();
    const day = today.toLocaleDateString("default", { weekday: "long" });
    return `${day}, ${dd} ${mm} ${yyyy}`;
  };

  const renderWeb3Account = () => {
    if (account && userBalance) {
      return (
        <>
          <div className="selected-network">
            <Image
              className="selected-network__icon"
              src={logoUrl}
              preview={false}
            />
            <p className="selected-network__txt">{label}</p>
          </div>
          <div className="connected-account">
            <p className="connected-account__balance">
              {`${new BigNumber(userBalance).toFixed(
                3
              )} ${nativeCurrencySymbol}`}
            </p>
            <div className="connected-account__addr">
              {shortenAddress(account)}
            </div>
          </div>

          <p className="main-layout__site-layout__header__group-avatar__date">
            {getDate()}
          </p>
          <Popover
            overlayClassName="main-layout__site-layout__header__group-avatar__noti"
            placement="bottomRight"
            arrowPointAtCenter
            title={null}
            zIndex={99999}
            content={<ModalHeader type={0} />}
            trigger="click"
          >
            <Badge count={0} size="small" showZero>
              <BellOutlined style={{ fontSize: "20  px", color: "#ffffff" }} />
            </Badge>
          </Popover>
          <Popover
            overlayClassName="main-layout__site-layout__header__group-avatar__profile"
            placement="bottomRight"
            arrowPointAtCenter
            title={null}
            zIndex={99999}
            content={<ModalHeader type={1} />}
            trigger="click"
          >
            <Avatar
              src={avatarLink}
              className="main-layout__site-layout__header__group-avatar__avatar"
            />
          </Popover>
        </>
      );
    } else if (error instanceof UnsupportedChainIdError) {
      return (
        <>
          <Button
            className="switch-network"
            onClick={async () => {
              try {
                // check if the chain to connect to is installed
                await (window as any).ethereum.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: "0x7E2" }], // chainId must be in hexadecimal numbers
                });
              } catch (error: any) {
                // This error code indicates that the chain has not been added to MetaMask
                // if it is not, then install it into the user MetaMask
                if (error.code === 4902) {
                  try {
                    await (window as any).ethereum.request({
                      method: "wallet_addEthereumChain",
                      params: [
                        {
                          chainId: "0x7E2",
                          chainName: "CharityVerse",
                          rpcUrls: ["https://custom.charityverse.info"],
                          blockExplorerUrls: ["https://35.209.169.120:4000"],
                          nativeCurrency: {
                            name: "CharityVerse",
                            symbol: "CRV", // 2-6 characters long
                            decimals: 18,
                          },
                        },
                      ],
                    });
                  } catch (addError) {
                    console.error(addError);
                  }
                  console.error(error);
                }
              }
            }}
          >
            <SwapOutlined />
            <span>Switch Network</span>
          </Button>
          <div className="wrong-network">
            <Image src="/icon/wrong-network.svg" preview={false} />
            <p className="wrong-network__txt">
              {error instanceof UnsupportedChainIdError
                ? "Wrong Network"
                : "Error"}
            </p>
          </div>
        </>
      );
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }} className="main-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        color="#FFFFFF"
        className="main-layout__sider"
        theme="light"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
        width={260}
      >
        <div
          className="main-layout__sider__img"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img src="../../icon/logo.svg" alt="" />
        </div>
        <Menu
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          theme="light"
          className="main-layout__sider__menu"
        >
          <Menu.Item
            key="Dashboard"
            icon={<Image src="/icon/dashboard.svg" preview={false} />}
            className="main-layout__sider__menu__item"
            onClick={() => {
              setSelectedKey("Dashboard");
              navigate("/dashboard");
            }}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="Donee"
            icon={<Image src="/icon/donee.svg" preview={false} />}
            className="main-layout__sider__menu__item"
            onClick={() => {
              setSelectedKey("Donee");
              navigate("/donee");
            }}
          >
            Donee
          </Menu.Item>
          <Menu.Item
            key="Exchange"
            icon={<Image src="/icon/exchange.svg" preview={false} />}
            className="main-layout__sider__menu__item"
            onClick={() => {
              setSelectedKey("Exchange");
              navigate("/exchange?tab=0");
            }}
          >
            Exchange Money
          </Menu.Item>
          <Menu.Item
            key="ContactF"
            icon={<Image src="/icon/contact-us.svg" preview={false} />}
            className="main-layout__sider__menu__item"
          >
            Contact us
          </Menu.Item>
          <Menu.Item
            key="Voting"
            icon={<Image src="/icon/voting.svg" preview={false} />}
            className="main-layout__sider__menu__item"
            onClick={() => {
              setSelectedKey("Voting");
              navigate("/voting");
            }}
          >
            Voting
          </Menu.Item>
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
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
