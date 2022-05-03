import { BellOutlined, SwapOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Badge,
  Button,
  Image,
  Input,
  Layout,
  Menu,
  message,
  Popover,
  SelectProps,
  Tooltip,
} from "antd";
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
  getDefaultNotification,
  getUserById,
} from "../../stores/action/user-layout.action";
import { shortenAddress } from "../../utils";
import io from "socket.io-client";
import "./index.scss";
import useDebounce from "../../hooks/useDebounce";

const { Header, Sider, Content } = Layout;
const { Search } = Input;

export const NotificationContext = React.createContext<
  | {
      content: string;
      type: number;
      createDate: string;
    }[]
  | undefined
>(undefined);

const UserLayout: React.FC = (props): ReactElement => {
  const [inputSearch, setInputSearch] = useState("");
  const [dataSource, setDataSource] = useState<SelectProps<object>["options"]>(
    []
  );

  const [notifications, setNotifications] = useState<
    {
      content: string;
      type: number;
      createDate: string;
    }[]
  >([]);
  const [socket, setSocket] = useState<any>(null);
  const [userBalance, setUserBalance] = useState<string>("0");
  const [selectedKey, setSelectedKey] = useLocalStorage(
    "activeTab",
    "Dashboard"
  );
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account, chainId, error } = useWeb3React();
  const [charityStorage, setCharityStorage] = useLocalStorage("charity", {
    auth: {},
  });

  const { badluckerType, userData } = useSelector(
    (state: any) => state.userLayout
  );

  const debouncedKeyword = useDebounce<string>(inputSearch, 500);

  let url = `users/donees?&limit=30&keyword=${debouncedKeyword}&userType=4`;

  const { data, loading } = useFetch<any>(
    url,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [],
    {}
  );

  useEffect(() => {
    data &&
      setDataSource(
        data.rows.map((dataResult: any) => ({
          text: dataResult.name,
          id: dataResult.id,
          avatar: (function () {
            const userAvatar = dataResult.UserMedia.filter(
              (userMedia: any) =>
                userMedia.type === "1" && userMedia.active === 1
            )
              .slice(0, 1)
              .pop();
            return userAvatar ? userAvatar.link : null;
          })(),
          identityId: dataResult.identityId,
          situation: (function () {
            if (dataResult?.BadLuckTypes?.length === 0) {
              return "";
            } else {
              return dataResult?.BadLuckTypes[0].BadLuckerSituation.name;
            }
          })(),
        }))
      );
  }, [data]);

  const handleSearch = (value: string) => {
    setInputSearch(value);
  };

  useEffect(() => {
    const newSocket = io(`https://socket.test.charityverse.info`);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  useEffect(() => {
    if (
      socket &&
      account &&
      charityStorage &&
      (charityStorage as any).auth[account]
    ) {
      const socketData = (charityStorage as any).auth[account].socketData;

      socket.on(`notification/${socketData}`, (data: any) => {
        const contentData = JSON.parse(data);
        setNotifications([
          ...notifications,
          {
            ...JSON.parse(data),
          },
        ]);
        message.info(
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={contentData.avatar} style={{ marginRight: "10px" }} />
            <p style={{ marginBottom: "0" }}>
              {contentData.name} {contentData.content}
            </p>
          </div>,
          4
        );
      });
    }
  }, [socket, charityStorage, account]);

  // useEffect(() => {
  //   if (account) {
  //     window.location.reload();
  //   }
  // }, [account]);

  const avatarLink = userData?.UserMedia?.find(
    (media: any) => media.type === "1" && media.active === 1
  )
    ? userData?.UserMedia?.find(
        (media: any) => media.type === "1" && media.active === 1
      ).link
    : "/icon/AvatarTmp.png";

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

  const { data: notificationDefault } = useFetch<any>(
    "notification/get-notification?type=0&limit=10&offset=0",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [],
    {},
    (e) => {
      const action = getDefaultNotification(e.data);
      dispatch(action);
      // const action = getUserById(e.data);
      // dispatch(action);
    }
  );

  const { data: blkSituation } = useFetch<any>(
    "bad-lucker/get-badlucker-situation",
    {},
    false,
    [],
    { method: "GET" },
    (e) => {
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
              <Tooltip title={account}>{shortenAddress(account)}</Tooltip>
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
            <Badge
              count={notifications.length}
              size="small"
              showZero
              style={{ cursor: "pointer" }}
            >
              <BellOutlined
                style={{
                  fontSize: "20px",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              />
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
            <div className="avatar-group-v1">
              <Avatar
                src={avatarLink}
                className="main-layout__site-layout__header__group-avatar__avatar"
              />
            </div>
          </Popover>
          {userData?.isOnTop && (
            <Tooltip title="Bạn được chọn là người đi xác nhận hoàn cảnh!">
              <Image
                className="on-top"
                preview={false}
                src="/icon/selected-user.svg"
              />
            </Tooltip>
          )}
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
                            symbol: "VNC", // 2-6 characters long
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
    <NotificationContext.Provider value={notifications}>
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
              Bảng điểu khiển
            </Menu.Item>
            <Menu.Item
              key="Donee"
              icon={<Image src="/icon/donee.svg" preview={false} />}
              className="main-layout__sider__menu__item"
              onClick={() => {
                setSelectedKey("Donee");
                navigate("/donee");
              }}
              hidden={user?.isAdmin}
            >
              Người cần từ thiện
            </Menu.Item>
            <Menu.Item
              key="Exchange"
              icon={<Image src="/icon/exchange.svg" preview={false} />}
              className="main-layout__sider__menu__item"
              onClick={() => {
                setSelectedKey("Exchange");
                navigate("/exchange?type=buy&tab=0");
              }}
              hidden={user?.isAdmin}
            >
              Đổi tiền
            </Menu.Item>
            <Menu.Item
              key="ContactF"
              icon={<Image src="/icon/contact-us.svg" preview={false} />}
              className="main-layout__sider__menu__item"
              onClick={() => {
                setSelectedKey("ContactUs");
                navigate("/contact-us");
              }}
            >
              Liên lạc
            </Menu.Item>
            <Menu.Item
              key="Voting"
              icon={<Image src="/icon/voting.svg" preview={false} />}
              className="main-layout__sider__menu__item"
              onClick={() => {
                setSelectedKey("Voting");
                navigate("/voting");
              }}
              hidden={user?.isAdmin}
            >
              Bỏ phiếu
            </Menu.Item>
            {user?.isAdmin ? (
              <Menu.Item
                key="Admin"
                icon={
                  <Image
                    src="/icon/admin.svg"
                    preview={false}
                    style={{ width: 25, height: 25 }}
                  />
                }
                className="main-layout__sider__menu__item"
                onClick={() => {
                  setSelectedKey("Admin");
                  navigate("/admin");
                }}
              >
                Quản trị
              </Menu.Item>
            ) : undefined}
            <Menu.Item
              key="Claim"
              icon={
                <Image
                  src="/icon/finance.svg"
                  preview={false}
                  style={{ width: 25, height: 25 }}
                />
              }
              className="main-layout__sider__menu__item"
              onClick={() => {
                setSelectedKey("Claim");
                navigate("/claim");
              }}
              hidden={user?.isAdmin}
            >
              Tiền thưởng
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="main-layout__site-layout">
          <Header className="main-layout__site-layout__header">
            <AutoComplete
              // open={inputSearch !== ""}
              value={inputSearch}
              dropdownMatchSelectWidth={500}
              autoFocus={true}
              onSelect={(val: any) => {
                setInputSearch("");
                navigate(`/profile/${val}`);
              }}
              onSearch={handleSearch}
              dropdownClassName="layout__header__dropdown"
              className="main-layout__site-layout__header__search"
              notFoundContent="Không tìm thấy người được từ thiện!"
              placeholder="Tìm kiếm theo người được từ thiện..."
            >
              {dataSource?.map((data) => (
                <AutoComplete.Option key={data.id}>
                  <div className="search-option">
                    <Avatar
                      src={data.avatar}
                      className="search-option__avatar"
                    />
                    <span className="search-option__name">
                      {data.text} ({data.identityId})
                    </span>
                    <span className="search-option__divider">-</span>
                    <strong>{data.situation}</strong>
                  </div>
                </AutoComplete.Option>
              ))}
            </AutoComplete>
            <div className="main-layout__site-layout__header__group-avatar">
              {renderWeb3Account()}
            </div>
          </Header>
          <Content>{props.children}</Content>
        </Layout>
      </Layout>
    </NotificationContext.Provider>
  );
};

export default UserLayout;
