import { Typography, Button, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3React } from "web3-react-core";
import { BigNumber } from "bignumber.js";
//@ts-ignore
import Fade from "react-reveal/Fade";
import AppDialog from "../../../../components/AppDialog";
import AppLoading from "../../../../components/AppLoading";
import { CHAIN_INFO } from "../../../../constants/chainInfo";
import { SupportedChainId } from "../../../../constants/chains";
import { useCharityVerseContract } from "../../../../hooks/useContract";
import useFetch from "../../../../hooks/useFetch";
import Message from "../../../../constants/message";
import "./index.scss";

const OrderInput: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [startIssuing, setStartIssuing] = useState<boolean | undefined>(
    undefined
  );
  const [inputAmount, setInputAmount] = useState<string>("0");
  const [orderId, setOrderId] = useState<string>("");
  const [txHash, setTxHash] = useState<undefined | string>(undefined);
  const [startGettingSignature, setStartGettingSignature] = useState<
    boolean | undefined
  >(undefined);
  const navigate = useNavigate();
  const charityContract = useCharityVerseContract();

  const { account, chainId } = useWeb3React();

  const { explorer } =
    CHAIN_INFO[
    chainId ? (chainId as SupportedChainId) : SupportedChainId.CHARITY
    ];

  const { data, loading, error } = useFetch<{
    signature: string;
    nonce: string;
    paymentID: string;
    amount: string;
  }>(
    `transactions/buy`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [startGettingSignature],
    {
      method: "POST",
      body: JSON.stringify({
        paymentId: orderId,
      }),
    },
    () => {
      setStartGettingSignature(undefined);
    },
    () => {
      setStartGettingSignature(undefined);
    }
  );

  useEffect(() => {
    if (data) {
      setStartIssuing(true);
      setInputAmount(data?.amount);
      return;
    }
    setStartIssuing(false);
  }, [data]);

  useEffect(() => {
    const issueTokens = async () => {
      try {
        setStartIssuing(true);

        const tx = await charityContract.issueTokensByInvestor(
          account,
          data?.amount,
          data?.nonce,
          data?.paymentID,
          data?.signature
        );

        setTxHash(tx.hash);

        await tx.wait(3);

        setOpenDialog(true);
        setStartIssuing(false);
        setTxHash(undefined);
      } catch (err: any) {
        message.error(err.message, 3);
        setStartIssuing(false);
      }
    };

    startIssuing && data && charityContract && account && issueTokens();
  }, [startIssuing, charityContract, data, account, inputAmount]);

  useEffect(() => {
    error && message.error(error?.message, 3);
  }, [error]);

  return (
    <div className="order-input">
      <Typography.Title level={4} className="order-input__title">
        1. Điền mã giao dịch của bạn
      </Typography.Title>
      <div className="order-input__content">
        <div className="order-input__order-detail">
          <Input
            className="order-input__input"
            value={orderId}
            onChange={(e: any) => setOrderId(e.target.value)}
          />
        </div>
        <Button
          className="order-input__btn"
          disabled={orderId.length === 0}
          onClick={() => setStartGettingSignature(true)}
        >
          Đã chuyển tiền
        </Button>
      </div>
      <AppDialog
        type="infor"
        title={`Bạn đã mua thành công thành công ${new BigNumber(inputAmount)
          .div(1e18)
          .toFixed()} coin từ nhà phát hành`}
        description=""
        confirmText={Message.INFOR_CF_01}
        onConfirm={() => {
          setOpenDialog(false);
          setInputAmount("0");
          setOrderId("");
        }}
        visible={openDialog}
        onCancel={() => setOpenDialog(false)}
      />
      {(loading || startIssuing) && (
        <AppLoading
          showContent={txHash !== undefined}
          loadingContent={
            <Fade bottom>
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
            </Fade>
          }
        />
      )}
    </div>
  );
};

export default OrderInput;
