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

type AppDonateProps = {
  onClose: () => void;
  walletAddress: string;
  avatar: string;
  name: string;
};

const AppDonate: React.FC<AppDonateProps> = (props) => {
  const { name, avatar, walletAddress, onClose } = props;
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

  // useEffect(() => {
  //     !isComponentVisible && onClose && onClose();
  // }, [isComponentVisible, onClose]);

  useEffect(() => {
    const queryDonateFee = async () => {
      const donateFee = await charityContract.donateFeePercent();
      setDonateFee(donateFee / 10000);
    };

    charityContract && queryDonateFee();
  }, [charityContract]);

  useEffect(() => {
    const getCRVBalance = async () => {
      const balance = await charityContract.balanceOf(account);
      setUserBalance(
        new BigNumber(ethers.utils.formatEther(balance)).toFixed(2)
      );
    };

    charityContract && (account || txHash) && getCRVBalance();
  }, [charityContract, account, txHash]);

  const handleUserDonation = async () => {
    try {
      if (charityContract && account && walletAddress) {
        setLoadingDonate(true);

        const tx = await charityContract.donate(
          walletAddress,
          new BigNumber(inputAmount).multipliedBy(1e18).toFixed()
        );

        setTxHash(tx.hash);

        await tx.wait(3);

        setTxHash(undefined);
        setLoadingDonate(false);
        setInputAmount("0");

        message.success(
          `Bạn đã ủng hộ thành công ${inputAmount} coin cho ${name}`,
          5
        );
      }
    } catch (err: any) {
      setLoadingDonate(false);
      message.error(err.message, 3);
    }
  };

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
              Ủng hộ
            </Typography.Title>
            <div className="app-donate__content">
              <div className="app-donate__donation">
                <div className="app-donate__amount">
                  <header className="app-donate__header">
                    <Typography.Title
                      level={4}
                      className="app-donate__amount-title"
                    >
                      Số tiền ủng hộ
                    </Typography.Title>
                    <Typography.Paragraph className="app-donate__balance">
                      Số dư: {userBalance}
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
                    onKeyDown={(e: any) => {
                      if (
                        e.code === "ArrowLeft" ||
                        e.code === "ArrowRight" ||
                        e.code === "ArrowUp" ||
                        e.code === "ArrowDown" ||
                        e.code === "Delete" ||
                        e.code === "Backspace"
                      ) {
                        return;
                      } else if (e.key.search(/\d/) === -1) {
                        e.preventDefault();
                      } else if (e.target.value.length >= 8) {
                        e.preventDefault();
                      }
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
                    content="Ủng hộ ngay"
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
                    Chi tiết giao dịch
                  </p>
                  <div className="app-donate-details__info">
                    <div className="app-details-info__block">
                      <span className="app-details-info__label">Ủng hộ</span>
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
                        Phí giao dịch
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
                      <span className="details-info__label">Ủng hộ</span>
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
                      <p>Bạn ủng hộ cho</p>
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
        title={`Bạn có chắc chắn muốn ủng hộ ${inputAmount} coin cho ${name} ?`}
        description="Nếu chưa thì xem xét hết thông tin, hãy xem lại"
        confirmText={"Yes"}
        cancelText={"No"}
        onConfirm={() => {
          setOpenDialog(false);
          handleUserDonation();
        }}
        onClose={() => {
          setOpenDialog(false);
        }}
        visible={openDialog}
        onCancel={() => setOpenDialog(false)}
      />
      {loadingDonate && (
        <AppLoading
          showContent={txHash !== undefined}
          loadingContent={
            <div className="tx-info">
              <p className="tx-info__alert">
                Giao dịch của bạn đang được xử lý ! Vui lòng kiên nhẫn.
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
                Nhấn để xem thêm
              </span>
            </div>
          }
        />
      )}
    </>
  );
};

export default AppDonate;
