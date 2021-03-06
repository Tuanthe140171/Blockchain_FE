import { Typography, Image, InputNumber, Avatar, message } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { CloseOutlined } from "@ant-design/icons";
import { useWeb3React } from "web3-react-core";
//@ts-ignore
import Fade from "react-reveal/Fade";
import Button from "../Button";
import { useCharityVerseContract } from "../../hooks/useContract";
import useComponentVisible from "../../hooks/useOnClickOutside";
import BigNumber from "bignumber.js";
import AppDialog from "../AppDialog";
import AppLoading from "../AppLoading";
import { CHAIN_INFO } from "../../constants/chainInfo";
import { SupportedChainId } from "../../constants/chains";
import "./index.scss";
import useFetch from "../../hooks/useFetch";

type AppDonateProps = {
  onClose: () => void;
  walletAddress: string;
  avatar: string;
  name: string;
};

const AppDonate: React.FC<AppDonateProps> = (props) => {
  const { name, avatar, walletAddress, onClose } = props;
  const [startDonating, setStartDonating] = useState<boolean | undefined>(
    undefined
  );
  const [txHash, setTxHash] = useState<undefined | string>(undefined);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loadingDonate, setLoadingDonate] = useState<boolean>(false);
  const [inputAmount, setInputAmount] = useState<string>("0");
  const [userBalance, setUserBalance] = useState<string>("0");
  const [donateFee, setDonateFee] = useState(0);
  const { account, chainId } = useWeb3React();
  const charityContract = useCharityVerseContract();

  const { ref, isComponentVisible } = useComponentVisible(true);

  const { explorer } =
    CHAIN_INFO[
    chainId ? (chainId as SupportedChainId) : SupportedChainId.CHARITY
    ];

  useEffect(() => {
    const queryDonateFee = async () => {
      const donateFee = await charityContract.donateFeePercent();
      setDonateFee(donateFee / 10000);
    };

    charityContract && queryDonateFee();
  }, [charityContract]);


  const { data, loading, error } = useFetch<{
    signature: string;
    nonce: string;
    amount: string;
    recipient: string;
  }>(
    `transactions/donate`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [startDonating],
    {
      method: "POST",
      body: JSON.stringify({
        amount: `${inputAmount}`,
        receiverId: walletAddress
      }),
    },
    () => setStartDonating(undefined),
    () => setStartDonating(undefined)
  );

  useEffect(() => {
    error && message.error(error.message, 4);
  }, [error]);
  
  useEffect(() => {
    if (data) {
      const handleUserDonation = async () => {
        try {
          if (charityContract && account && name) {
            setLoadingDonate(true);

            const tx = await charityContract.donate(
              data.recipient,
              data.amount,
              data.nonce,
              data.signature
            );

            setTxHash(tx.hash);

            await tx.wait(3);

            setTxHash(undefined);
            setLoadingDonate(false);
            setInputAmount("0");

            message.success(
              `B???n ???? ???ng h??? th??nh c??ng ${new BigNumber(data.amount).div(1e18).toFixed(3)} coin cho ${name}`,
              5
            );
          }
        } catch (err: any) {
          setLoadingDonate(false);
          message.error(err.message, 3);
        }
      };

      handleUserDonation();
    }
  }, [data, charityContract, account, name]);

  useEffect(() => {
    const getCRVBalance = async () => {
      const balance = await charityContract.balanceOf(account);
      setUserBalance(
        new BigNumber(ethers.utils.formatEther(balance)).toFixed(2)
      );
    };

    charityContract && (account || txHash) && getCRVBalance();
  }, [charityContract, account, txHash]);

  return (
    <>
      <div className="app-donate">
        <div className="app-donate__backdrop"></div>
        <Fade bottom>
          <div
            className="app-donate__wrapper"
            ref={(ele: any) => {
              ref.current = ele;
            }}
          >
            <CloseOutlined
              className="app-donate__close"
              onClick={props.onClose}
            />
            <Typography.Title level={4} className="app-donate__title">
              ???ng h???
            </Typography.Title>
            <div className="app-donate__content">
              <div className="app-donate__donation">
                <div className="app-donate__amount">
                  <header className="app-donate__header">
                    <Typography.Title
                      level={4}
                      className="app-donate__amount-title"
                    >
                      S??? ti???n ???ng h???
                    </Typography.Title>
                    <Typography.Paragraph className="app-donate__balance">
                      S??? d??: {userBalance}
                    </Typography.Paragraph>
                  </header>
                  <InputNumber
                    addonAfter={
                      <div className="app-donate__icon">
                        <Image src="/icon/ethereum_1.svg" preview={false} />
                        <p>VNC</p>
                      </div>
                    }
                    placeholder="0"
                    value={inputAmount}
                    onChange={(e: any) => {
                      !e ? setInputAmount("0") : setInputAmount(e);
                    }}
                    onKeyPress={(e: any) => {
                      const splitString = e.target.value.split(".");
                      if (splitString[0].length > 5) {
                        e.preventDefault();
                        return;  
                      }

                      if (splitString[1].length > 2) {
                        e.preventDefault();
                        return;
                      }

                      if (
                        e.charCode === 0 ||
                        ((e.charCode >= 48 && e.charCode <= 57) ||
                          (e.charCode === 46 && e.target.value.indexOf('.') < 0))
                      ) {
                        return true;
                      }

                      e.preventDefault();
                    }}
                    controls={false}
                    className="app-donate__input"
                  />
                  <Button
                    onClick={() => {
                      setOpenDialog(true);
                    }}
                    disabled={
                      loadingDonate ||
                      new BigNumber(inputAmount).gt(
                        new BigNumber(userBalance)
                      ) ||
                      new BigNumber(inputAmount).lte(0)
                    }
                    width="215px"
                    maxWidth="100%"
                    content="???ng h??? ngay"
                    bgColor="#F0CF27"
                    className="app-donate__cta"
                  />
                  <span className="app-donate__policy">
                    By continuing, you agree with Cverse terms and privacy
                    policy
                  </span>
                </div>
              </div>
              <div className="app-donate__transaction">
                <div className="app-donate-details">
                  <p className="app-donate-details__title">
                    Chi ti???t giao d???ch
                  </p>
                  <div className="app-donate-details__info">
                    <div className="app-details-info__block">
                      <span className="app-details-info__label">???ng h???</span>
                      <span className="app-details-info__text">
                        <strong
                          style={{ maxWidth: 100, wordBreak: "break-word" }}
                        >
                          {inputAmount ? inputAmount : "0"}
                        </strong>
                        <Image src="/icon/ethereum_2.svg" preview={false} />
                      </span>
                    </div>
                    <div className="app-details-info__block">
                      <span className="app-details-info__label">
                        Ph?? giao d???ch
                      </span>
                      <span className="app-details-info__text">
                        <strong
                          style={{ maxWidth: 100, wordBreak: "break-word" }}
                        >
                          {new BigNumber(inputAmount || "0")
                            .multipliedBy(donateFee)
                            .toFixed(2)}
                        </strong>
                        <Image src="/icon/ethereum_2.svg" preview={false} />
                      </span>
                    </div>
                    <div className="app-details-info__divider"></div>
                    <div className="app-details-info__block">
                      <span className="details-info__label">???ng h???</span>
                      <span className="app-details-info__text">
                        <strong
                          style={{ maxWidth: 100, wordBreak: "break-word" }}
                        >
                          {new BigNumber(inputAmount || "0")
                            .multipliedBy(1 - donateFee)
                            .toFixed(2)}
                        </strong>
                        <Image src="/icon/ethereum_2.svg" preview={false} />
                      </span>
                    </div>
                  </div>
                  <div className="app-donate-details__receipt app-details-receipt">
                    <Avatar
                      src={avatar}
                      className="app-details-receipt__label"
                    ></Avatar>
                    <span className="app-details-receipt__text">
                      <p>B???n ???ng h??? cho</p>
                      <strong>{name}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
      <AppDialog
        type="confirm"
        title={`B???n c?? ch???c ch???n mu???n ???ng h??? ${inputAmount} coin cho ${name} ?`}
        description="N???u ch??a th?? xem x??t h???t th??ng tin, h??y xem l???i"
        confirmText={"Yes"}
        cancelText={"No"}
        onConfirm={() => {
          setOpenDialog(false);
          setStartDonating(true);
        }}
        onClose={() => {
          setOpenDialog(false);
        }}
        visible={openDialog}
        onCancel={() => setOpenDialog(false)}
      />
      {(loadingDonate || loading) && (
        <AppLoading
          showContent={txHash !== undefined}
          loadingContent={
            <Fade bottom>
              <div className="tx-info">
                <p className="tx-info__alert">
                  Giao d???ch c???a b???n ??ang ???????c x??? l?? ! Vui l??ng ki??n nh???n.
                </p>
                <p className="tx-info__title">
                  <strong>{txHash}</strong>
                </p>
                <span
                  className="tx-info__view-more"
                  onClick={() =>
                    window.open(`${explorer}/tx/${txHash}`, "_blank")
                  }
                >
                  Nh???n ????? xem th??m
                </span>
              </div>
            </Fade>
          }
        />
      )}
    </>
  );
};

export default AppDonate;
