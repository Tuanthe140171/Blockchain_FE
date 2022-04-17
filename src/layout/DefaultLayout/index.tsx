import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Image, Layout, Menu, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import React, { ReactElement, useState, useEffect, useCallback, useContext } from "react";
import { WarningOutlined } from "@ant-design/icons";
import { useWeb3React } from "web3-react-core";
import { injected } from "../../connectors";
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import { AuthorizeErrorType } from "../../hooks/useAuthorization";
import { AuthorizationContext } from "../../components/Web3ReactManager";
import { signTypedMessage } from "../../blockchain/signMessage";
import "./index.scss";

const DefaultLayout: React.FC = (props): ReactElement => {
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signature, setSignature] = useState<string | undefined>();

  const { error: authorizeError } = useContext(AuthorizationContext);
  const navigate = useNavigate();
  const { activate, library, account } = useWeb3React();
  const [charityStorage, setCharityStorage] = useLocalStorage("charity", { auth: {} });
  const [_, setSelectedKey] = useLocalStorage("activeTab", "Dashboard");

  const { data: authData, loading } = useFetch<any>(
    "auth",
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    false,
    [signature, account],
    {
      body: JSON.stringify({
        signature,
        address: account
      }),
      method: "POST"
    },
    () => {
      setSignature(undefined)
    },
    () => {
      setSignature(undefined)
    }
  );
  
  useEffect(() => {
    activate && activate(injected);
  }, [activate]);

  useEffect(() => {
    authorizeError && setShowSignatureModal(authorizeError === AuthorizeErrorType.UNAUTHORIZED)
  }, [authorizeError]);

  useEffect(() => {
    if (authData && account) {
      setCharityStorage({
        auth: {
          ...charityStorage.auth,
          [account]: {
            token: authData.key,
            address: account,
            socketData: authData.socketData
          }
        }
      })
    }
  }, [authData, account]);

  useEffect(() => {
    setSignature(undefined);
  }, [account]);

  const doAuthorize = useCallback(async () => {
    if (authorizeError === AuthorizeErrorType.UNAUTHORIZED && library && account) {
      try {
        const signature = await signTypedMessage(library, account);
        setSignature(signature);
      } catch (err: any) {
        message.error(err.message, 3);
      }
    }
  }, [authorizeError, library, account]);

  return (
    <Layout className="container">
      <Layout.Header className="header">
        <div className="header__left">
          <Image
            width={180}
            src="/icon/logo.svg"
            preview={false}
            className="header__logo"
          />
          <Menu mode="horizontal" selectable={false} className="header__menu">
            {/* <Menu.Item
              key="1"
              icon={<CaretDownOutlined />}
              className="menu__icon"
            >
              Donate for
            </Menu.Item> */}
            <Menu.Item key="2" className="menu__icon">
              Giới thiệu
            </Menu.Item>
            <Menu.Item key="3" className="menu__icon">
              Hướng dẫn sử dụng
            </Menu.Item>
          </Menu>
        </div>
        <div className="header__right">
          <Button className="connect-btn" onClick={async () => {
            if (authorizeError === AuthorizeErrorType.NONE) {
              setSelectedKey("Dashboard");
              navigate("/dashboard");
            } else if (authorizeError === AuthorizeErrorType.WRONG_NETWORK) {
              try {
                await (window as any).ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: "0x7E2",
                      chainName: "CharityVerse",
                      rpcUrls: ["https://rpc.test.charityverse.info"],
                      blockExplorerUrls: ["https://blockscout.charityverse.info/"],
                      nativeCurrency: {
                        name: "CharityVerse",
                        symbol: "VNC", // 2-6 characters long
                        decimals: 18,
                      },
                    },
                  ],
                });
              } catch (addError) {
                console.log(addError);
              }
            } else if (authorizeError === AuthorizeErrorType.UNAUTHORIZED) {
              setShowSignatureModal(true);
            }
          }
          }>
            {
              authorizeError === AuthorizeErrorType.NONE ? "Vào ứng dụng" : "Kết nối ví"
            }
          </Button>
          <Modal
            visible={showSignatureModal}
            centered={true}
            closable={false}
            maskClosable={true}
            footer={null}
            onCancel={() => setShowSignatureModal(false)}
            className="signature-require-modal"
          >
            <WarningOutlined className="signature-require-modal__icon" />
            <p className="signature-require-modal__title">Yêu cầu chữ ký</p>
            <p className="signature-require-modal__desc">Vui lòng đăng kí bằng ví của bạn để xác nhận</p>
            <Button className="signature-require-modal__btn" onClick={doAuthorize}>Ký</Button>
          </Modal>
        </div>
      </Layout.Header>
      {props.children}
    </Layout>
  );
};

export default DefaultLayout;
