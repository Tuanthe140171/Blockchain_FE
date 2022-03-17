import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Image, Layout, Menu, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import React, { ReactElement, useState, useEffect, useCallback } from "react";
import { WarningOutlined } from "@ant-design/icons";
import { useWeb3React } from "web3-react-core";
import { injected } from "../../connectors";
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import useAuthorization, { AuthorizeErrorType } from "../../hooks/useAuthorization";
import { signTypedMessage } from "../../blockchain/signMessage";
import "./index.scss";

const DefaultLayout: React.FC = (props): ReactElement => {
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signature, setSignature] = useState<string | undefined>();

  const authorizeError = useAuthorization();
  const navigate = useNavigate();
  const { activate, library, account } = useWeb3React();
  const [charityStorage, setCharityStorage] = useLocalStorage("charity", { auth: {} });

  const { data: accessToken, loading, error } = useFetch<any>(
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
    if (accessToken && account) {
      setCharityStorage({
        auth: {
          ...charityStorage.auth,
          [account]: {
            token: accessToken,
            address: account
          }
        }
      })
    }
  }, [accessToken, account]);

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
          <Button className="connect-btn" onClick={async () => {
            if (authorizeError === AuthorizeErrorType.NONE) {
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
                console.log(addError);
              }
            } else if (authorizeError === AuthorizeErrorType.UNAUTHORIZED) {
              setShowSignatureModal(true);
            }
          }
          }>
            {
              authorizeError === AuthorizeErrorType.NONE ? "Launch App" : "Connect Wallet"
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
            <p className="signature-require-modal__title">Signature Required</p>
            <p className="signature-require-modal__desc">Please sign on your wallet to confirm</p>
            <Button className="signature-require-modal__btn" onClick={doAuthorize}>Sign</Button>
          </Modal>
        </div>
      </Layout.Header>
      {props.children}
    </Layout>
  );
};

export default DefaultLayout;
